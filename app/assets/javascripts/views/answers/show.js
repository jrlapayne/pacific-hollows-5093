Gangnam.Views.AnswersShow = Backbone.View.extend({
	
	template: JST['answers/show'],
	
	events: {
		'click .button' : 'renderResults'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.answer = this.attr.answers.where({id: options.answer.get('id')})[0];
		this.subviews = [];
	},
	
	render: function() {
		$(this.el).attr('id', this.answer.get('id'));
		$(this.el).addClass('answer container');
		$(this.el).html(this.template({
			answer: this.answer
		}));
		return this;
	},
	
	renderResults: function(event) {
		var view = new Gangnam.Views.AnswersResults({
			attr: this.attr,
			answer: this.answer
		});
		this.subviews.push(view);
		var question = this.attr.questions.where({id: this.answer.get('question_id')})[0];
		var user = this.attr.users.where({id: this.attr.current_user.get('id')})[0];
		this.attr.tasks.quizTask(question, this.answer, user, this.attr.reputations, this.attr.achievements, this.attr.user_achievements);
		$('.answers').html(view.render().el);
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