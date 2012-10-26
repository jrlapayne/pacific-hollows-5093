Gangnam.Collections.Votes = Backbone.Collection.extend({
	
	model: Gangnam.Models.Vote,
	url: 'votes',
	
	addOrUpdate: function(user, question_id, fact_id, comment_id, value) {
		var vote;
		if(!this.where({user_id: user.get('id'), question_id: question_id, fact_id: fact_id, comment_id: comment_id})[0]) {
			vote = this.create({
				question_id: question_id,
				fact_id: fact_id,
				comment_id: comment_id,
				user_id: user.get('id'),
				value: value
			});
		} else {
			vote = this.where({user_id: user.get('id'), question_id: question_id, fact_id: fact_id, comment_id: comment_id})[0];
			vote.set({value: value});
			vote.save();
		}
		
		return vote;
	}
});
