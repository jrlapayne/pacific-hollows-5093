Gangnam.Collections.Users = Backbone.Collection.extend({
	
	model: Gangnam.Models.User,
	url: 'users',
	
	comparator: function(user) {
		return - user.get('rep');
	},
	
	getIssueRank: function(user, issue, reputations) {
		var users = this.where({});
		var array = [];
		var rank = users.length;
		var rep, loc = null;
		
		for (i = 0; i < users.length; i++) {
			if (reputations.where({user_id: users[i].get('id'), issue_id: issue.get('id')})[0]) {
				rep = reputations.where({user_id: users[i].get('id'), issue_id: issue.get('id')})[0].get('rep');
			} else {
				rep = 0;
			}
			array.push({id: users[i].get('id'), rep: rep});
		}
		
		array.sort(function(a, b) {
			return b.rep - a.rep;
		});

		for (i = 0; i < array.length; i++) {
			if (array[i].id === user.get('id')) {
				loc = i;
			}
			if (loc !== null && array[loc].rep > array[i].rep) {
				rank = i;
				break;
			}
		}
		
		return {rank: rank, users: users.length};
	},
	
	getRank: function(user) {
		this.sort();
		var users = _.toArray(this);
		var rank = users.length;
		
		for (i = 0; i < users.length; i++) {
			if (user.get('rep') > users[i].get('rep')) {
				rank = i;
				break;
			}
		}
		
		return {rank: rank, users: users.length};
	}
});
