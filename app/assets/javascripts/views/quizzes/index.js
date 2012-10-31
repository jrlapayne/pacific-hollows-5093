Gangnam.Views.QuizzesIndex = Backbone.View.extend({
	
	id: 'quizzes',
	
	events: {
		
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.issue = options.issue;
		this.questions = this.attr.questions.where({issue_id: this.issue.get('id'), has_quiz: true});
	},
	
	render: function() {
		var self = this;
		
		setTimeout(function() {
			self.renderIssue();
			for (i = 0; i < self.questions.length; i++) {
				if (!self.attr.tasks.where({user_id: self.attr.current_user.get('id'), question_id: self.questions[i].get('id'), is_quiz: true})[0]) {
					self.renderQuiz(self.questions[i]);
				}
			}
		}, 0);
		return this;
	},
	
	renderIssue: function() {
		var view = new Gangnam.Views.IssuesShow({
			attr: this.attr,
			issue: this.issue,
			category: null
		});
		$('#left_top').html(view.render().el);
	},
	
	renderQuiz: function(question) {
		var view = new Gangnam.Views.QuizzesShow({
			attr: this.attr,
			question: question
		});
		$('#quizzes').html(view.render().el);
	}
});