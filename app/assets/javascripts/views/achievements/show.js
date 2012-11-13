Gangnam.Views.AchievementsShow = Backbone.View.extend({
	
	template: JST['achievements/show'],
	
	events: {
		
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.issue = options.issue;
		this.user = options.user;
		this.achievement = options.achievement;
	},
	
	render: function() {
		$(this.el).addClass('achievement tooltip');
		$(this.el).html(this.template({
			amount: this.getAmount(),
			achievement: this.achievement,
			user_unlocked: this.hasPrivilege()
		}));
		return this;
	},
	
	getAmount: function() {
		var amount = 0, achievements;
		if (this.issue === null) {
			if (this.attr.user_achievements.where({achievement_id: this.achievement.get('id'), user_id: this.user.get('id')}).length > 0) {
				achievements = this.attr.user_achievements.where({achievement_id: this.achievement.get('id'), user_id: this.user.get('id')});
				
				for (j = 0; j < achievements.length; j++) {
					amount = amount + achievements[j].get('amount');
				}
			}
		} else {
			if (this.attr.user_achievements.where({achievement_id: this.achievement.get('id'), user_id: this.user.get('id'), issue_id: this.issue.get('id')})[0]) {
				amount = this.attr.user_achievements.where({achievement_id: this.achievement.get('id'), user_id: this.user.get('id'), issue_id: this.issue.get('id')})[0].get('amount');
			}
		}

		return amount;
	},
	
	hasPrivilege: function() {
		if (this.achievement.get('id') < 5) {
			return true;
		}
		
		var user_privilege = this.attr.user_privileges.where({user_id: this.user.get('id'), privilege_id: this.achievement.get('id') - 4})[0];
		
		if (!user_privilege) {
			return false;
		} else {
			return true;
		}
	}
});