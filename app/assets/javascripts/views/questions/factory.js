Gangnam.Views.QuestionsFactory = Backbone.View.extend({
	
	events: {
		'click .question-box' : 'questionShow'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.questions = this.attr.questions;
		this.facts = this.attr.facts;
	},
	
	render: function() {
		var self = this;
		$(this.el).attr('id', 'questions');
		
		setTimeout(function() {
			self.questions.each(function(q) {
				if (self.facts.where({question_id: q.get('id')}).length === 0) {
					self.appendQuestion(q);
				}
			});
		}, 0);
		return this;
	},
	
	appendQuestion: function(question) {
		var view = new Gangnam.Views.QuestionsPreview({
			attr: this.attr,
			question: question
		});
		$('#questions').append(view.render().el);
	},
	
	questionShow: function(event) {
		var element = $(event.target).closest('.question-box');
		Backbone.history.navigate('question' + $(element).attr('id'), true);
	}
});