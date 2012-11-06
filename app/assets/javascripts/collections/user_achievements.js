Gangnam.Collections.UserAchievements = Backbone.Collection.extend({
	
	model: Gangnam.Models.UserAchievement,
	url: 'user_achievements',
	
	addOrUpdate: function(user, achievement, issue_id) {
		var user_achv, count = 0;
		var achievements = this.where({user_id: user.get('id'), achievement_id: achievement.get('id')});
		for (i = 0; i < achievements.length; i++) {
			count = count + achievements[i].get('amount');
		}
		
		for (i = 0; i < achievement.get('levels').split('/').length; i++) {
			if (count + 1 === parseInt(achievement.get('levels').split('/')[i])) {
				this.popup(achievement, count + 1);
			}
		}
		
		if (this.where({user_id: user.get('id'), achievement_id: achievement.get('id'), issue_id: issue_id})[0]) {
			user_achv = this.where({user_id: user.get('id'), achievement_id: achievement.get('id'), issue_id: issue_id})[0];
			
			user_achv.set({
				amount: user_achv.get('amount') + 1
			});
			user_achv.save();
		} else {
			user_achv = this.create({
				achievement_id: achievement.get('id'),
				user_id: user.get('id'),
				issue_id: issue_id,
				amount: 1
			});
		}
	},
	
	popup: function(achievement, amount) {
		var view = new Gangnam.Views.PopupsAchievement({
			achievement: achievement,
			amount: amount
		});
		$('.popup').html(view.render().el);
	}
});
