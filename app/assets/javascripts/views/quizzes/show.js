Gangnam.Views.QuizzesShow = Backbone.View.extend({
	
	template: JST['quizzes/show'],
	
	events: {
		
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.question = this.attr.questions.where({id: options.question.get('id')})[0];
	},
	
	render: function() {
		var self = this;
		$(this.el).attr('id', this.question.get('id'));
		$(this.el).addClass('quiz');
		$(this.el).html(this.template({
			question: this.question
		}));
		setTimeout(function() {
			self.renderAnswers();
		}, 0);
		return this;
	},
	
	renderAnswers: function() {
		var view = new Gangnam.Views.AnswersIndex({
			attr: this.attr,
			question: this.question
		});
		$('.answers').html(view.render().el);
	}
});