Gangnam.Views.CommentsShow = Backbone.View.extend({
	
	template: JST['comments/show'],
	
	events: {
		'click #comment_reply' : ''
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.comment = this.attr.comments.where({id: options.comment.get('id')})[0];
		this.subviews = [];
	},
	
	render: function() {
		var self = this;
		$(this.el).attr('id', this.comment.get('id'));
		$(this.el).addClass('commentpanel border');
		$(this.el).html(this.template({
			comment: this.comment
		}));
		setTimeout(function() {
			self.renderVotes();
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
	
	renderChild: function(comment) {
		var view = new Gangnam.Views.CommentsShow({
			attr: this.attr,
			comment: comment
		});
		this.subviews.push(view);
		$(this.el).find('#children' + this.comment.get('id')).append(view.render().el);
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
	
	commentReply: function() {
		$(this.el).find('#reply' + this.comment.get('id')).html(JST['comments/reply']);
	},
	
	submitComment: function(event) {
		var comment, ancestry;
		event.preventDefault();
		ancestry = this.comment.get('ancestry') + this.comment.get('id') + '/';
		if ($('#comment_content').val() && $('#comment_content').val() !== "") {
			comment = this.attr.comments.create({
				content: $('#comment_content').val(),
				user_id: this.attr.current_user.get('id'),
				fact_id: this.comment.get('fact_id'),
				ancestry: ancestry
			});
			this.appendComment(comment);
		}
		$(this.el).find('#reply' + this.comment.get('id')).html('<button id = "comment_reply">Reply</button>');
	},
	
	appendComment: function(comment) {
		var view = new Protogap0.Views.CommentsShow({
			attr: this.attr,
			comment: comment
		});
		$(this.el).find('#children' + this.comment.get('id')).append(view.render().el);
	},
	
	upvote: function(event) {
		var comment_id = parseInt($(event.target).closest('.commentpanel').attr('id'));
		
		this.attr.scores.addOrUpdate(
			this.attr.comments.where({id: comment_id})[0],
			this.attr.users.where({id: this.attr.current_user.get('id')})[0],
			1
		);
		
		this.attr.comments.resetScores(this.attr.scores);
	},
	
	downvote: function(event) {
		var comment_id = parseInt($(event.target).closest('.commentpanel').attr('id'));
		
		this.attr.scores.addOrUpdate(
			this.attr.comments.where({id: comment_id})[0],
			this.attr.users.where({id: this.attr.current_user.get('id')})[0],
			-1
		);
		
		this.attr.comments.resetScores(this.attr.scores);
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