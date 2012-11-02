Gangnam.Views.QuestionsFactory = Backbone.View.extend({
	
	events: {
		'click .question' : 'factsIndex'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.questions = this.getQuestions();
		
		this.attr.issues.on('filter', this.filterQuestions, this);
	},
	
	render: function() {
		var self = this;
		$(this.el).attr('id', 'questions');
		$(this.el).children().remove();
		
		setTimeout(function() {
			for (i = 0; i < self.questions.length; i++) {
				self.appendQuestion(self.questions[i]);
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
		Backbone.history.navigate('question' + $(element).attr('id'), true);
	},
	
	getQuestions: function(array) {
		var array = [];
		var questions = _.toArray(this.attr.questions);
		
		for (i = 0; i < questions.length; i++) {
			if (this.attr.facts.where({question_id: questions[i].get('id')}).length === 0) {
				array.push(questions[i]);
			}
		}
		
		for (i = 0; i < questions.length; i++) {
			if (this.attr.facts.where({question_id: questions[i].get('id')}).length === 1) {
				array.push(questions[i]);
			}
		}
		
		return array;
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
		
		for (i = 0; i < zero_questions.length; i++) {
			this.questions.push(zero_questions[i]);
		}
		for (i = 0; i < one_questions.length; i++) {
			this.questions.push(one_questions[i]);
		}
	},
	
	onClose: function() {
		this.attr.issues.unbind('filter');
	}
});