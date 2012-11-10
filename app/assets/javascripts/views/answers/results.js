Gangnam.Views.AnswersResults = Backbone.View.extend({
	
	template: JST['answers/results'],
	
	events: {
		'click #next' : 'nextQuestion',
		'click #dispute' : 'questionShow'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.answer = options.answer;
		this.setCorrectAns(this.answer);
		this.subviews = [];
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
	},
	
	nextQuestion: function() {
		var view = new Gangnam.Views.QuizzesIndex({
			attr: this.attr,
			issue: this.attr.issues.where({id: this.attr.questions.where({id: this.answer.get('question_id')})[0].get('issue_id')})[0]
		});
		this.subviews.push(view);
		$('#right').html(view.render().el);
	},
	
	questionShow: function() {
		Backbone.history.navigate('question' + this.answer.get('question_id'), true);
	},
	
	onClose: function() {
		_.each(this.subviews, function(view) {
			view.remove();
			view.unbind();
			
			if (view.onClose) {
				view.onClose();
			}
		});
	}
});