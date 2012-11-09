Gangnam.Views.QuestionsScore = Backbone.View.extend({
	
	template: JST['questions/score'],
	
	initialize: function(options) {
		this.attr = options.attr;
		this.question = options.question;
		
		this.question.on('change:score', this.render, this);
	},
	
	render: function() {
		$(this.el).addClass('votes number');
		$(this.el).html(this.template({
			score: this.getScore()
		}));
		return this;
	},
	
	getScore: function() {
		return this.attr.questions.where({id: this.question.get('id')})[0].get('score');
	},
	
	onClose: function() {
		this.question.unbind('change:score', this.render);
	}
});