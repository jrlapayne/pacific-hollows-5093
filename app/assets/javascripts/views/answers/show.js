Gangnam.Views.AnswersShow = Backbone.View.extend({
	
	template: JST['answers/show'],
	
	events: {
		'click .button' : 'renderResults'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.answer = this.attr.answers.where({id: options.answer.get('id')})[0];
	},
	
	render: function() {
		$(this.el).attr('id', this.answer.get('id'));
		$(this.el).addClass('answer container');
		$(this.el).html(this.template({
			answer: this.answer
		}));
		return this;
	},
	
	renderResults: function(event) {
		var view = new Gangnam.Views.AnswersResults({
			attr: this.attr,
			answer: this.answer
		});
		var question = this.attr.questions.where({id: this.answer.get('question_id')})[0];
		alert('stop!');
		this.attr.tasks.quizTask(question, this.answer, this.attr.current_user, this.attr.reputations);
		alert('go!');
		$('.answers').html(view.render().el);
	}
});