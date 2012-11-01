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
		var new_question = false;
		
		setTimeout(function() {
			self.renderIssue();
			self.renderAnsweredQuestions();
			for (i = 0; i < self.questions.length; i++) {
				if (!self.attr.tasks.where({user_id: self.attr.current_user.get('id'), question_id: self.questions[i].get('id'), is_quiz: true})[0]) {
					new_question = true;
					self.renderQuiz(self.questions[i]);
				}
			}
			if (!new_question) {
				self.renderComplete();
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
	},
	
	renderComplete: function() {
		var view = new Gangnam.Views.QuizzesComplete({
			attr: this.attr,
			issue: this.issue
		});
		$('#quizzes').html(view.render().el);
	},
	
	renderAnsweredQuestions: function() {
		var view = new Gangnam.Views.QuizzesAnswered({
			attr: this.attr,
			issue: this.issue,
			user: this.attr.users.where({id: this.attr.current_user.get('id')})[0]
		});
		$('#left_bottom').html(view.render().el);
	}
});