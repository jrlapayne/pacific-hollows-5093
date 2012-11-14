Gangnam.Models.Question = Backbone.Model.extend({
	
	updateFromQuedit: function(quedit) {
		this.set({
			title: quedit.get('title'),
			description: quedit.get('description'),
			category: quedit.get('category'),
			edit_id: quedit.get('id')
		});
		this.save();
	},
	
	updateScore: function(votes) {
		var score = 0;
		var question_votes = votes.where({question_id: this.get('id'), fact_id: null, comment_id: null});
		
		for (i = 0; i < question_votes.length; i++) {
			score = score + question_votes[i].get('value');
		}
		
		this.set({score: score});
		this.save();
	},
});
