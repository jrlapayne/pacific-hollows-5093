Gangnam.Views.QuizzesAnswered = Backbone.View.extend({
	
	id: 'answered',
	
	events: {
		
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.issue = options.issue;
		this.user = options.user;
		this.subviews = [];
		
		this.attr.tasks.on('add', this.render, this);
	},
	
	render: function() {
		var self = this;
		$(this.el).children().remove();
		var questions = this.getQuestions(this.attr.questions.where({issue_id: this.issue.get('id'), has_quiz: true}), this.attr.tasks, this.user);
		
		setTimeout(function() {
			for(i = 0; i < questions.length; i++) {
				self.appendAnswered(questions[i]);
			}
		}, 0);
		return this;
	},
	
	appendAnswered: function(question, is_correct) {
		var view = new Gangnam.Views.AnswersAnswered({
			attr: this.attr,
			question: question
		});
		this.subviews.push(view);
		$(this.el).append(view.render().el);
	},
	
	getQuestions: function(questions, tasks, user) {
		var array = [];
		
		for (i = 0; i < questions.length; i++) {
			if (tasks.where({user_id: user.get('id'), question_id: questions[i].get('id'), is_quiz: true})[0]) {
				array.push(questions[i]);
			}
		}
		
		return array;
	},
	
	onClose: function() {
		_.each(this.subviews, function(view) {
			view.remove();
			view.unbind();
			
			if (view.onClose) {
				view.onClose();
			}
		});
		
		this.attr.tasks.unbind('add', this.render);
	}
});