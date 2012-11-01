Gangnam.Views.AnswersCreate = Backbone.View.extend({
	
	template: JST['answers/create'],
	
	events: {
		'submit #answers' : 'createAnswers',
		'click #cancel' : 'renderQuestion'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.question = options.question;
		this.answers = this.attr.answers.where({question_id: this.question.get('id'), is_correct: false});
		this.correct = this.attr.answers.where({question_id: this.question.get('id'), is_correct: true})[0];
	},
	
	render: function() {
		$(this.el).addClass('panel question active');
		$(this.el).html(this.template({
			answers: this.answers,
			correct: this.correct
		}));
		return this;
	},
	
	createAnswers: function(event) {
		event.preventDefault();
		var array = [], is_correct, to_destroy = [], answers = [];
		
		answers.push(this.correct);
		
		for (i = 0; i < this.answers.length; i++) {
			answers.push(this.answers[i]);
		}
		
		array.push($('#correct').val());
		array.push($('#wrong1').val());
		array.push($('#wrong2').val());
		array.push($('#wrong3').val());
		
		for (i = 0; i < array.length; i++) {
			is_correct = false;
			if (i === 0) {
				is_correct = true;
			} 
			if (answers[i]) {
				if (array[i] !== "" && /\S/.test(array[i])) {
					to_destroy.push(answers[i]);
				} else {
					answers[i].set({content: array[i], is_correct: is_correct});
					answers[i].save();
				}
			} else {
				if (array[i] !== "" && /\S/.test(array[i])) {
					this.attr.answers.create({
						content: array[i],
						question_id: this.question.get('id'),
						is_correct: is_correct
					});
				}
			}
		}
		
		for (i = 0; i < to_destroy.length; i++) {
			to_destroy[i].destroy();
		}
		
		this.renderQuestion();
	},
	
	renderQuestion: function() {
		var element = $(this.el).closest('#question');
		var view = new Gangnam.Views.QuestionsShow({
			attr: this.attr,
			question: this.question
		});
		
		$(element).children().remove();
		$(element).html(view.render().el);
	},
});