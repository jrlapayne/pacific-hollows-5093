Gangnam.Collections.Fedits = Backbone.Collection.extend({
	
	model: Gangnam.Models.Fedit,
	url: 'fedits',
	
	initialize: function() {
		this.on('makenew', this.makenew, this);
	},
	
	achievement: function(user, achievements, user_achievements, issue) {
		user_achievements.addOrUpdate(user, achievements.where({id: 8})[0], issue.get('id'));
	},
	
	makenew: function(fact) {
		alert(fact.get('id'));
	}
});
