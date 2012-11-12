Gangnam.Views.IssuesShow = Backbone.View.extend({

	template: JST['issues/show'],
	
	events: {
		'click #back' : 'goBack',
		'click #quiz' : 'issueQuiz',
		'click .leaderboard_name' : 'userShow'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.issue = this.attr.issues.where({id: options.issue.get('id')})[0];
		this.category = options.category;
	},
	
	render: function() {
		var self = this;
		$(this.el).addClass('issue active');
		$(this.el).html(this.template({
			issue: this.issue
		}));
		setTimeout(function() {
			self.renderUserRank();
		}, 0);
		return this;
	},
	
	renderUserRank: function() {
		var view = new Gangnam.Views.ReputationsIssue({
			attr: this.attr,
			issue: this.issue
		});
		$(this.el).find('#user_info').html(view.render().el);
	},
	
	goBack: function(event) {
		var id = parseInt(window.location.hash.slice(9));
		var question = this.attr.questions.where({id: id})[0];
		
		if (window.location.hash.slice(1, 9) === 'question') {
			if (question.get('category') === 'basic') {
				Backbone.history.navigate('issue' + this.issue.get('id') + '/basics', true);
			} else {
				Backbone.history.navigate('issue' + this.issue.get('id') + '/advanced', true);
			}
		}
	},
	
	issueQuiz: function(event) {
		Backbone.history.navigate('quiz' + this.issue.get('id'), true);
	},
	
	userShow: function(event) {
		var element = $(event.target).closest('.leaderboard_name');
		
		Backbone.history.navigate('users' + parseInt($(element).attr('id')), true);
	}
});