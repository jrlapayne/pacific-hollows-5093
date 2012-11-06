Gangnam.Views.QuestionsFactory = Backbone.View.extend({
	
	events: {
		'click .question' : 'factsIndex'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		
		this.attr.issues.on('filter', this.render, this);
	},
	
	render: function() {
		var self = this;
		this.filterQuestions();
		
		$(this.el).attr('id', 'questions');
		$(this.el).children().remove();
		
		setTimeout(function() {
			for (q = 0; q < self.questions.length; q++) {
				self.appendQuestion(self.questions[q]);
			}
		}, 0);
		return this;
	},
	
	appendQuestion: function(question) {
		var view = new Gangnam.Views.QuestionsPreview({
			attr: this.attr,
			question: question,
			questions: this.questions
		});
		$('#questions').append(view.render().el);
	},
	
	factsIndex: function(event) {
		var element = $(event.target).closest('.question');
		var question = this.attr.questions.where({id: parseInt($(element).attr('id'))})[0];
		var current_user = this.attr.users.where({id: this.attr.current_user.get('id')})[0];
		
		this.attr.tasks.browseTask(question, current_user, this.attr.reputations);
		this.issueShow(question.get('issue_id'));
		Backbone.history.navigate('question' + $(element).attr('id'), true);
	},
	
	issueShow: function(id) {
		var view = new Gangnam.Views.IssuesShow({
			attr: this.attr,
			issue: this.attr.issues.where({id: id})[0]
		});
		$('#left_top').html(view.render().el);
	},
	
	filterQuestions: function() {
		var zero_questions = [], one_questions = [], temp_questions = [];
		this.questions = [];
		
		for (i = 0; i < window.factory.length; i++) {
			temp_questions = this.attr.questions.where({issue_id: window.factory[i]});
			
			for (j = 0; j < temp_questions.length; j++) {
				if (this.attr.facts.where({question_id: temp_questions[j].get('id')}).length === 0) {
					zero_questions.push(temp_questions[j]);
				}
				if (this.attr.facts.where({question_id: temp_questions[j].get('id')}).length === 1) {
					one_questions.push(temp_questions[j]);
				}
			}
		}
		
		zero_questions.sort(function(a, b) {
			return b.get('score') - a.get('score');
		});
		one_questions.sort(function(a, b) {
			return b.get('score') - a.get('score');
		});
		
		for (k = 0; k < zero_questions.length; k++) {
			this.questions.push(zero_questions[k]);
		}
		for (l = 0; l < one_questions.length; l++) {
			this.questions.push(one_questions[l]);
		}
	},
	
	onClose: function() {
		this.attr.issues.unbind('filter');
	}
});