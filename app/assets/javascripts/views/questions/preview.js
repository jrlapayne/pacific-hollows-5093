Gangnam.Views.QuestionsPreview = Backbone.View.extend({
	
	template: JST['questions/preview'],
	
	events: {
		
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.question = this.attr.questions.where({id: options.question.get('id')})[0];
		this.questions = options.questions;
	},
	
	render: function() {
		$(this.el).addClass('panel question preview');
		$(this.el).attr('id', this.question.get('id'));
		if (this.question.get('id') === this.questions[0].get('id')) {
			$(this.el).addClass('top');
		}
		if (this.question.get('id') === this.questions[this.questions.length - 1].get('id')) {
			$(this.el).addClass('bottom');
		}
		$(this.el).html(this.template({
			question: this.question
		}));
		return this;
	}
});