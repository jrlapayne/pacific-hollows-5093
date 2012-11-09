Gangnam.Views.IssuesQuiz = Backbone.View.extend({

	template: JST['issues/quiz'],
	
	events: {
		'click #exit' : 'issueShow',
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
		if ($(event.target).hasClass('quiz') || $(event.target).attr('id') === 'quiz') {
			return;
		}
		if (window.location.hash.slice(1, 9) === 'question') {
			parent.history.back();
		} else {
			Backbone.history.navigate('issues', true);
		}
	},
	
	issueShow: function(event) {
		Backbone.history.navigate('issue' + this.issue.get('id') + '/basics', true);
	},
	
	userShow: function(event) {
		var element = $(event.target).closest('.leaderboard_name');
		
		Backbone.history.navigate('users' + parseInt($(element).attr('id')), true);
	}
});