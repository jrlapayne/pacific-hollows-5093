Gangnam.Collections.Users = Backbone.Collection.extend({
	
	model: Gangnam.Models.User,
	url: 'users',
	
	comparator: function(user) {
		return - user.get('rep');
	},
	
	getRank: function(user) {
		var users = [], rank, loc = null;
		
		this.each(function(u) {
			if (u.get('rep') !== 0) {
				users.push({id: u.get('id'), rep: u.get('rep')});
			}
		});
		
		rank = users.length;
		users.sort(function(a,b) {
			return b.rep - a.rep;
		});
		
		for (i = 0; i < users.length; i++) {
			if (users[i].id === user.get('id')) {
				loc = i;
			}
			if (loc !== null && users[loc].rep > users[i].rep) {
				rank = i;
				break;
			}
		}
		
		if (loc === null && rank === users.length) {
			rank = null;
		}
		
		return {rank: rank, users: users.length};
	}
});
