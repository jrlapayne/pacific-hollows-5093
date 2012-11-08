Gangnam.Views.AchievementsIndex = Backbone.View.extend({
	
	events: {
		
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.user = options.user;
		this.issue = options.issue;
		this.achievements = _.toArray(this.attr.achievements);
	},
	
	render: function() {
		var self = this;
		$(this.el).addClass('achievements');
		setTimeout(function() {
			for (i = 0; i < self.achievements.length; i++) {
				self.appendAchievement(self.achievements[i]);
			}
		}, 0);
		return this;
	},
	
	appendAchievement: function(achievement) {
		var view = new Gangnam.Views.AchievementsShow({
			attr: this.attr,
			achievement: achievement,
			user: this.user,
			issue: this.issue
		});
		$(this.el).append(view.render().el);
	}
});