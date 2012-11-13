Gangnam.Views.QuestionsIndex = Backbone.View.extend({
	
	template: JST['questions/index'],
	
	events: {
		'click .bubble' : 'factsIndex',
		'click #basic_questions' : 'questionsBasics',
		'click #advanced_questions' : 'questionsAdvanced'
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
		$(this.el).html(this.template({
			questions: this.questions
		}));
		this.renderIssue(this.issue, this.category);
		this.renderLeaderboard();
		setTimeout(function() {
			self.setTabs();
			for (i = 0; i < self.questions.length; i++) {
				self.appendQuestion(self.questions[i]);
			}
		}, 0);
		return this;
	},
	
	setTabs: function() {
		if (this.category === 'basic') {
			$(this.el).find('#basic_questions').addClass('basics-active');
			$(this.el).find('#advanced_questions').addClass('advanced-inactive');
		} else {
			$(this.el).find('#basic_questions').addClass('basics-inactive');
			$(this.el).find('#advanced_questions').addClass('advanced-active');
		}
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
	
	renderLeaderboard: function() {
		var view = new Gangnam.Views.UsersLeaderboard({
			attr: this.attr,
			issue: this.issue
		});
		$('#left_bottom').html(view.render().el);
	},
	
	factsIndex: function(event) {
		var element = $(event.target).closest('.question');
		var question = this.attr.questions.where({id: parseInt($(element).attr('id'))})[0];
		var current_user = this.attr.users.where({id: this.attr.current_user.get('id')})[0];
		
		this.attr.tasks.browseTask(
			question, 
			current_user, 
			this.attr.reputations, 
			this.attr.achievements, 
			this.attr.user_achievements,
			this.attr.user_privileges,
			this.attr.privileges
		);
		Backbone.history.navigate('question' + $(element).attr('id'), true);
	},
	
	questionsBasics: function() {
		if ($('#basic_questions').hasClass('basics-active')) {
			return;
		}
		
		Backbone.history.navigate('issue' + this.issue.get('id') + '/basics', true);
	},
	
	questionsAdvanced: function() {
		if ($('#advanced_questions').hasClass('advanced-active')) {
			return;
		}
		
		Backbone.history.navigate('issue' + this.issue.get('id') + '/advanced', true);
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
