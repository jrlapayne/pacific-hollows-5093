Gangnam.Views.AnswersAnswered = Backbone.View.extend({
	
	template: JST['answers/answered'],
	
	events: {
		'click .question' : 'showQuestion'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.question = options.question;
		this.user = this.attr.users.where({id: this.attr.current_user.get('id')})[0];
		this.is_correct = this.getCorrect(this.attr.tasks, this.attr.answers, this.question, this.user);
	},
	
	render: function() {
		$(this.el).html(this.template({
			question: this.question,
			is_correct: this.is_correct
		}));
		return this;
	},
	
	getCorrect: function(tasks, answers, question, user) {
		return answers.where({id: tasks.where({question_id: question.get('id'), user_id: user.get('id'), is_quiz: true})[0].get('answer_id')})[0].get('is_correct');
	},
	
	showQuestion: function(event) {
		var id = $(event.target).closest('.question').attr('id');
		
		Backbone.history.navigate('question' + id, true);
	}
});