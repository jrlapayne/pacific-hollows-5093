Gangnam.Collections.Quedits = Backbone.Collection.extend({

	model: Gangnam.Models.Quedit,
	url: 'quedits',
	
	achievement: function(user, achievements, user_achievements, issue) {
		user_achievements.addOrUpdate(user, achievements.where({id: 5})[0], issue.get('id'));
	}
});
