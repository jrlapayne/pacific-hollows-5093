Gangnam.Views.AnswersResults = Backbone.View.extend({
	
	template: JST['answers/results'],
	
	events: {
		
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.answer = options.answer;
		this.setCorrectAns(this.answer);
	},
	
	render: function() {
		$(this.el).html(this.template({
			answer: this.correct_ans,
			is_correct: this.is_correct
		}));
		return this;
	},
	
	setCorrectAns: function(answer) {
		var correct_ans = this.attr.answers.where({question_id: answer.get('question_id'), is_correct: true})[0];
		
		if (correct_ans.get('id') === answer.get('id')) {
			this.is_correct = true;
			this.correct_ans = answer;
		}  else {
			this.is_correct = false;
			this.correct_ans = correct_ans;
		}
	}
});