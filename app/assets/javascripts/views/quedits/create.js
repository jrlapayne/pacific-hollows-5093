Gangnam.Views.QueditsCreate = Backbone.View.extend({
	
	template: JST['quedits/create'],
	
	events: {
		'click #cancel' : 'renderQuestion',
		'submit #question_edit' : 'createQuedit',
		'click #history' : 'queditsIndex'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.question = this.attr.questions.where({id: options.question.get('id')})[0];
	},
	
	render: function() {
		$(this.el).html(this.template({
			question: this.question
		}));
		return this;
	},
	
	renderQuestion: function() {
		var element = $(this.el).closest('#question');
		var view = new Gangnam.Views.QuestionsShow({
			attr: this.attr,
			question: this.question
		});
		
		$(element).children().remove();
		$(element).html(view.render().el);
	},
	
	createQuedit: function(event) {
		event.preventDefault();
		var self = this;
		var category;
		if($(this.el).find('#pro').attr('checked')) {
			category = 'pro';
		} else if ($(this.el).find('#con').attr('checked')) {
			category = 'con';
		} else {
			category = 'basic';
		}
		
		this.attr.quedits.create({
			issue_id: this.question.get('issue_id'),
			question_id: this.question.get('id'),
			title: $('#title').val(),
			description: $('#description').val(),
			category: category,
			user_id: this.attr.current_user.get('id')
		}, { 
			success: function(model, response) {
				self.question.updateFromQuedit(model);
				self.renderQuestion();
			}
		});
	},
	
	queditsIndex: function() {
		var element = $(this.el).closest('#question');
		var view = new Gangnam.Views.QueditsIndex({
			attr: this.attr,
			question: this.question
		});
		$(element).children().remove();
		$(element).html(view.render().el);
	}
});