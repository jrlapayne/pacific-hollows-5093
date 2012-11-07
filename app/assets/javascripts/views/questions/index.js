Gangnam.Views.QuestionsIndex = Backbone.View.extend({
	
	events: {
		'click .question' : 'factsIndex'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.issue = options.issue;
		this.category = options.category
		this.questions = this.attr.questions.where({issue_id: this.issue.get('id'), category: this.category});
		this.facts = this.attr.facts.where({issue_id: this.issue.get('id')});
		
		this.subviews = [];	
	},
	
	render: function() {
		var self = this;
		$(this.el).attr('id', 'questions');
		this.renderIssue(this.issue, this.category);
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
		this.subviews.push(view);
		$('#questions').append(view.render().el);
	},
	
	renderIssue: function(issue, category) {
		var view = new Gangnam.Views.IssuesShow({
			attr: this.attr,
			issue: issue,
			category: category
		});
		this.subviews.push(view);
		$('#left_top').html(view.render().el);
	},
	
	factsIndex: function(event) {
		var element = $(event.target).closest('.question');
		var question = this.attr.questions.where({id: parseInt($(element).attr('id'))})[0];
		var current_user = this.attr.users.where({id: this.attr.current_user.get('id')})[0];
		
		this.attr.tasks.browseTask(question, current_user, this.attr.reputations, this.attr.achievements, this.attr.user_achievements);
		Backbone.history.navigate('question' + $(element).attr('id'), true);
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
