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
		
		user.updateRep(amount);
	}
});
