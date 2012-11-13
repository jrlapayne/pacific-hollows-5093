Gangnam.Collections.Reputations = Backbone.Collection.extend({
	
	model: Gangnam.Models.Reputation,
	url: 'reputations',
	
	addOrUpdate: function(user, issue_id, amount) {
		var rep;
		
		if (this.where({user_id: user.get('id'), issue_id: issue_id})[0]) {
			rep = this.where({user_id: user.get('id'), issue_id: issue_id})[0];
			rep.set({rep: rep.get('rep') + amount});
			rep.save();
		} else {
			this.create({
				user_id: user.get('id'),
				issue_id: issue_id,
				rep: amount
			});
		}
	},
	
	getIssueRank: function(user, issue) {
		var users = this.where({issue_id: issue.get('id')});
		var array = [];
		var rank = users.length;
		var rep, loc = null;
		
		if (user) {
			for (i = 0; i < users.length; i++) {
				array.push({id: users[i].get('user_id'), rep: users[i].get('rep')});
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
		
			if (loc === null && rank === users.length) {
				rank = null;
			}
		
			return {rank: rank, users: users.length};
		} else {
			return {rank: null, users: null};
		}
	}
});
