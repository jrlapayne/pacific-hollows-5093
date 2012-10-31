Gangnam.Views.AnswersShow = Backbone.View.extend({
	
	template: JST['answers/show'],
	
	events: {
		
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.answer = this.attr.answers.where({id: options.answer.get('id')})[0];
	},
	
	render: function() {
		$(this.el).attr('id', this.answer.get('id'));
		$(this.el).addClass('answer');
		$(this.el).html(this.template({
			answer: this.answer
		}));
		return this;
	}
});