Gangnam.Views.QueditsCreate = Backbone.View.extend({
	
	template: JST['quedits/create'],
	
	events: {
		'click #cancel' : 'renderQuestion',
		'submit #question_edit' : 'createQuedit',
		'click #delete' : 'deleteQuestion',
		'click #history' : 'queditsIndex',
		'click #quiz' : 'answersCreate'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.question = this.attr.questions.where({id: options.question.get('id')})[0];
		this.user = this.attr.users.where({id: this.attr.current_user.get('id')})[0];
		this.subviews = [];
	},
	
	render: function() {
		$(this.el).html(this.template({
			question: this.question,
			user: this.user
		}));
		return this;
	},
	
	renderQuestion: function() {
		var element = $(this.el).closest('#question');
		var view = new Gangnam.Views.QuestionsShow({
			attr: this.attr,
			question: this.question
		});
		this.subviews.push(view);
		$(element).children().remove();
		$(element).html(view.render().el);
	},
	
	createQuedit: function(event) {
		event.preventDefault();
		var self = this;
		var category;
		if($(this.el).find('#basics').attr('checked')) {
			category = 'basic';
		} else {
			category = 'advance';
		}
		
		this.startLoading();
		this.attr.quedits.create({
			issue_id: this.question.get('issue_id'),
			question_id: this.question.get('id'),
			title: $('#title').val(),
			category: category,
			user_id: this.attr.current_user.get('id')
		}, { 
			success: function(model, response) {
				self.endLoading();
				self.question.updateFromQuedit(model);
				self.renderQuestion();
				self.attr.quedits.achievement(
					self.attr.users.where({id: self.attr.current_user.get('id')})[0],
					self.attr.achievements,
					self.attr.user_achievements,
					self.attr.issues.where({id: self.question.get('issue_id')})[0]
				);
			},
			error: function(model, response) {
				self.endLoading();
				alert(response.responseText);
			}
		});
	},
	
	queditsIndex: function() {
		var element = $(this.el).closest('#question');
		var view = new Gangnam.Views.QueditsIndex({
			attr: this.attr,
			question: this.question
		});
		this.subviews.push(view);
		$(element).children().remove();
		$(element).html(view.render().el);
	},
	
	deleteQuestion: function() {
		var self = this;
		if (confirm('Are you sure?')) {
			this.startLoading();
			this.question.destroy({
				success: function(model, response) {
					self.endLoading();
					parent.history.back();
				},
				error: function(model, response) {
					self.endLoading();
					alert(response.responseText);
				}
			});
		}
	},
	
	startLoading: function() {
		var view = new Gangnam.Views.PagesLoading();
		$('#loading').removeClass('inactive');
		$('#loading').addClass('active');
		$('#loading').html(view.render().el);
	},
	
	 endLoading: function() {
		$('#loading').removeClass('active');
		$('#loading').addClass('inactive');
		$('#loading').children().remove();
	},
	
	answersCreate: function() {
		var element = $(this.el).closest('#question');
		var view = new Gangnam.Views.AnswersCreate({
			attr: this.attr,
			question: this.question
		});
		this.subviews.push(view);
		$(element).children().remove();
		$(element).html(view.render().el);
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