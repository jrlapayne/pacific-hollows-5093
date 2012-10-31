Gangnam.Views.AnswersIndex = Backbone.View.extend({
	
	id: 'answers',
	
	events: {
		
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.question = options.question;
		this.answers = _.shuffle(this.attr.answers.where({question_id: this.question.get('id')}));
	},
	
	render: function() {
		var self = this;
		setTimeout(function() {
			for (i = 0; i < self.answers.length; i++) {
				self.appendAnswer(self.answers[i]);
			}
		}, 0);
		return this;
	},
	
	appendAnswer: function(answer) {
		var view = new Gangnam.Views.AnswersShow({
			attr: this.attr,
			answer: answer
		});
		$(this.el).append(view.render().el);
	}
});
