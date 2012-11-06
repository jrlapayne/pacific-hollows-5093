Gangnam.Collections.Votes = Backbone.Collection.extend({
	
	model: Gangnam.Models.Vote,
	url: 'votes',
	
	addOrUpdate: function(user, ids, value, achievements, user_achievements) {
		var vote;
		if(!this.where({user_id: user.get('id'), question_id: ids.question, fact_id: ids.fact, comment_id: ids.comment})[0]) {
			vote = this.create({
				question_id: ids.question,
				fact_id: ids.fact,
				comment_id: ids.comment,
				user_id: user.get('id'),
				value: value
			});
			
			if (value === 1) {
				user_achievements.addOrUpdate(user, achievements.where({id: 3})[0], ids.issue);
			} else {
				user_achievements.addOrUpdate(user, achievements.where({id: 4})[0], ids.issue);
			}
		} else {
			vote = this.where({user_id: user.get('id'), question_id: ids.question, fact_id: ids.fact, comment_id: ids.comment})[0];
			vote.set({value: value});
			vote.save();
		}
		
		return vote;
	}
});
