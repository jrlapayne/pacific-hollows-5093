Gangnam.Views.QuestionsPreview = Backbone.View.extend({
	
	template: JST['questions/preview'],
	
	events: {
		
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.question = this.attr.questions.where({id: options.question.get('id')})[0];
		this.questions = options.questions;
	},
	
	render: function() {
		var self = this;
		$(this.el).addClass('panel question preview');
		$(this.el).attr('id', this.question.get('id'));
		if (this.question.get('id') === this.questions[0].get('id')) {
			$(this.el).addClass('top');
		}
		if (this.question.get('id') === this.questions[this.questions.length - 1].get('id')) {
			$(this.el).addClass('bottom');
		}
		$(this.el).html(this.template({
			question: this.question,
			facts: this.getFacts(),
			comments: this.getComments()
		}));
		setTimeout(function() {
			self.renderRank();
			self.renderScore();
		}, 0)
		return this;
	},
	
	renderRank: function() {
		var view = new Gangnam.Views.ReputationsQuestion({
			attr: this.attr,
			issue: this.attr.issues.where({id: this.question.get('issue_id')})[0],
			question: this.question
		});
		$(this.el).find('#user_info').html(view.render().el);
	},
	
	renderScore: function() {
		var view = new Gangnam.Views.QuestionsScore({
			attr: this.attr,
			question: this.question
		});
		$(this.el).find('#score').html(view.render().el);
	},
	
	getFacts: function() {
		return this.attr.facts.where({question_id: this.question.get('id')});
	},
	
	getComments: function() {
		return this.attr.comments.where({question_id: this.question.get('id')});
	}
});