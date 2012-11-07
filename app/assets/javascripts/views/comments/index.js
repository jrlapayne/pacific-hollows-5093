Gangnam.Views.CommentsIndex = Backbone.View.extend({

	template: JST['comments/index'],
	
	events: {
		'click #new_comment' : 'createComment',
		'submit #newcomment' : 'submitComment',
		'click #hide-comments' : 'hideComments'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.question = options.question;
		this.fact = options.fact;
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
			$(self.el).find('#add_comment').html(JST['comments/add']);
			for (i = 0; i < self.comments.length; i++) {
				self.appendComment(self.comments[i]);
			}
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
	
	createComment: function() {
		$(this.el).find('#add_comment').html(JST['comments/create']);
	},
	
	submitComment: function(event) {
		event.preventDefault();		
		var comment, question_id, fact_id;
		if (this.fact === null) {
			question_id = this.question.get('id');
			fact_id = null;
		} else {
			question_id = this.fact.get('question_id');
			fact_id = this.fact.get('id');
		}
		
		if ($('#comment_content').val() && $('#comment_content').val() !== "" && /\S/.test($('#comment_content').val())) {
			comment = this.attr.comments.create({
				content: $('#comment_content').val(),
				user_id: this.attr.current_user.get('id'),
				question_id: question_id,
				fact_id: fact_id
			});
			this.appendComment(comment);
		}
		$(this.el).find('#add_comment').html(JST['comments/add']);
	},
	
	hideComments: function(event) {
		var comments, element;
		if (this.fact === null) {
			comments = this.attr.comments.where({question_id: this.question.get('id'), fact_id: null});
			element = $(event.target).closest('.comments');
		} else {
			comments = this.attr.comments.where({fact_id: this.fact.get('id')});
			element = $(event.target).closest('.fact-comments');
		}
		$(element).removeClass('active');
		$(element).html(JST['comments/number']({comments: comments}));
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
