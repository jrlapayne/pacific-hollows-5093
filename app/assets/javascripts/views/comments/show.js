Gangnam.Views.CommentsShow = Backbone.View.extend({
	
	template: JST['comments/show'],
	
	events: {
		'click #reply_button' : 'renderReply',
		'submit #reply' : 'replyComment'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.comment = this.attr.comments.where({id: options.comment.get('id')})[0];
		this.user = this.attr.users.where({id: this.attr.current_user.get('id')})[0];
		this.subviews = [];
	},
	
	render: function() {
		var self = this;
		$(this.el).attr('id', this.comment.get('id'));
		$(this.el).addClass('commentpanel');
		$(this.el).html(this.template({
			comment: this.comment
		}));
		setTimeout(function() {
			self.renderVotes();
			self.renderRank();
			self.getChildren(self.comment);	
		}, 0);
		return this;
	},
	
	renderVotes: function() {
		var view = new Gangnam.Views.VotesComment({
			attr: this.attr,
			comment: this.comment
		});
		this.subviews.push(view);
		$(this.el).find('#votes').html(view.render().el);
	},
	
	renderRank: function() {
		var view = new Gangnam.Views.ReputationsComment({
			attr: this.attr,
			comment: this.comment
		});
		this.subviews.push(view);
		$(this.el).find('#user_info').html(view.render().el);
	},
	
	renderChild: function(comment) {
		var view = new Gangnam.Views.CommentsShow({
			attr: this.attr,
			comment: comment
		});
		this.subviews.push(view);
		$(this.el).find('#children').append(view.render().el);
	},
	
	getChildren: function(comment) {
		var ancestry = comment.get('ancestry') + comment.get('id') + '/';
		var comments = this.attr.comments.where({question_id: comment.get('question_id'), fact_id: comment.get('fact_id'), ancestry: ancestry});
		var depth;
		if (comment.get('ancestry')) {
			depth = comment.get('ancestry').split('/').length - 1;
		} else {
			depth = 0;
		}
		var children = [], parent_id;
		
		if (comments.length !== 0) {
			for (i = 0; i < comments.length; i++) {
				parent_id = parseInt(comments[i].get('ancestry').split('/')[depth]);
				if (parent_id === comment.get('id')) {
					children.push(comments[i]);
				}
			}
			for (j = 0; j < children.length; j++) {
				this.renderChild(children[j]);
			}
		}
	},
	
	renderReply: function(event) {
		var element = $(event.target).closest('.commentpanel');
		var view = new Gangnam.Views.CommentsReply({
			attr: this.attr
		});
		this.subviews.push(view);
		$(element).find('#new_reply').html(view.render().el);
	},
	
	appendComment: function(comment) {
		var view = new Gangnam.Views.CommentsShow({
			attr: this.attr,
			comment: comment
		});
		$(this.el).find('#children').append(view.render().el);
	},
	
	replyComment: function(event) {
		event.preventDefault();	
		var self = this, content = $(this.el).find('#reply').find('#content').val();
		
		if (this.user.userConditions(this.attr.user_privileges, this.attr.privileges.where({id: 3})[0])) {
			if (content && content !== "" && /\S/.test(content)) {
				this.attr.comments.create({
					content: content,
					user_id: this.user.get('id'),
					question_id: this.comment.get('question_id'),
					fact_id: this.comment.get('fact_id'),
					ancestry: this.comment.get('ancestry') + this.comment.get('id') + '/'
				}, {
					success: function(comment, response) {
						self.appendComment(comment);
						$(self.el).find('#new_reply').children().remove();
					},
					error: function(comment, response) {
						$(self.el).find('#new_reply').children().remove();
						alert(response.responseText);
					}
				});
			}
		} else {
			if (!this.user.signedInUser()) {
				var view = new Gangnam.Views.PopupsSignin({
					attr: this.attr,
					user: this.user
				});
				$('.popup').html(view.render().el);
			} else {
				var view = new Gangnam.Views.PopupsNeedPrivilege({
					attr: this.attr,
					user: this.user,
					privilege: this.attr.privileges.where({id: 3})[0]
				});
				$('.popup').html(view.render().el);
			}
		}
	},
	
	onClose: function() {
		_.each(this.subviews, function(view) {
			view.remove();
			view.unbind();
			
			if (view.onClose) {
				view.onClose();
			}
		});
	}
});