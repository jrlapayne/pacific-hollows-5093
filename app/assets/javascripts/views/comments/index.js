Gangnam.Views.CommentsIndex = Backbone.View.extend({

	template: JST['comments/index'],
	
	events: {
		'submit #new' : 'createComment'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.question = options.question;
		this.fact = options.fact;
		this.user = this.attr.users.where({id: this.attr.current_user.get('id')})[0];
		if (this.fact === null) {
			this.comments = this.attr.comments.where({question_id: this.question.get('id'), fact_id: null, ancestry: null});
		} else {
			this.comments = this.attr.comments.where({question_id: this.fact.get('question_id'), fact_id: this.fact.get('id'), ancestry: null});
		}
		this.subviews = [];
	},
	
	render: function() {
		var self = this;
		
		$(this.el).html(this.template());
		setTimeout(function() {
			self.renderCreate();
			_.each(self.comments, function(comment) {
				self.appendComment(comment);
			});
		}, 0);
		return this;
	}, 
	
	appendComment: function(comment) {
		var view = new Gangnam.Views.CommentsShow({
			attr: this.attr,
			comment: comment
		});
		this.subviews.push(view);
		$('#comments').append(view.render().el);
	},
	
	renderCreate: function() {
		var view = new Gangnam.Views.CommentsCreate({
			attr: this.attr
		});
		this.subviews.push(view);
		$('#new_comment').html(view.render().el);
	},
	
	createComment: function(event) {
		event.preventDefault();
		var question_id, fact_id, self = this, content = $('#new').find('#content').val();
		
		if (!this.user.userConditions(this.attr.user_privileges, this.attr.privileges.where({id: 3})[0])) {
			if (this.fact === null) {
				question_id = this.question.get('id');
				fact_id = null;
			} else {
				question_id = this.fact.get('question_id');
				fact_id = this.fact.get('id');
			}

			if (content && content !== "" && /\S/.test(content)) {
				this.attr.comments.create({
					content: content,
					user_id: this.user.get('id'),
					question_id: question_id,
					fact_id: fact_id
				}, {
					success: function(comment, response) {
						self.appendComment(comment);
						self.renderCreate();
					},
					error: function(comment, response) {
						self.renderCreate();
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
