Gangnam.Views.UsersIssue = Backbone.View.extend({
	
	template: JST['users/issue'],
	
	events: {
		
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.issue = options.issue;
		this.user = options.user;
	},
	
	render: function() {
		var self = this;
		$(this.el).attr('id', this.issue.get('id'));
		$(this.el).addClass('panel user');
		$(this.el).html(this.template({
			issue: this.issue
		}));
		setTimeout(function() {
			self.renderRank();
			self.renderAchievements();
		}, 0);
		return this;
	},
	
	renderRank: function() {
		var view = new Gangnam.Views.ReputationsProfile({
			attr: this.attr,
			user: this.user,
			issue: this.issue	
		});
		$(this.el).find('#user_info').html(view.render().el);
	},
	
	renderAchievements: function() {
		var view = new Gangnam.Views.AchievementsIndex({
			attr: this.attr,
			user: this.user,
			issue: this.issue
		});
		$(this.el).find('#achievements').html(view.render().el);
	}
});