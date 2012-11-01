Gangnam.Views.QuizzesComplete = Backbone.View.extend({
	
	template: JST['quizzes/complete'],
	
	events: {
		
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.issue = options.issue;
		this.questions = this.attr.questions.where({issue_id: this.issue.get('id'), has_quiz: true});
		this.user = this.attr.users.where({id: this.attr.current_user.get('id')})[0];
	},
	
	render: function() {
		var self = this;
		$(this.el).addClass('panel quiz');
		$(this.el).html(this.template({
			score: this.getScore()
		}));
		return this;
	},
	
	getScore: function() {
		var task, num = 0, denom = this.questions.length;
		
		for (i = 0; i < this.questions.length; i++) {
			task = this.attr.tasks.where({question_id: this.questions[i].get('id'), user_id: this.user.get('id'), is_quiz: true})[0];
			if (task && this.attr.answers.where({id: task.get('answer_id')})[0].get('is_correct')) {
				num = num + 1;
			}
		}
		
		return Math.round((num / denom) * 100);
	}
});