Gangnam.Views.QuestionsFactory = Backbone.View.extend({
	
	events: {
		'click .question' : 'factsIndex'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
	},
	
	render: function() {
		var self = this;
		$(this.el).attr('id', 'questions');
		this.questions = this.getQuestions();
		
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
	
	getQuestions: function() {
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
	}
});