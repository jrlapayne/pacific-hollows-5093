Gangnam.Collections.Comments = Backbone.Collection.extend({

	model: Gangnam.Models.Comment,
	url: 'comments',
	
	comparator: function(comment) {
		return - comment.get('score');
	},
	
	resetScores: function(votes) {
		var score, com_votes;
		this.each(function(c) {
			score = 0;
			com_votes = votes.where({question_id: c.get('question_id'), fact_id: c.get('fact_id'), comment_id: c.get('id')});
			for (i = 0; i < com_votes.length; i++) {
				score = score + com_votes[i].get('value');
			}
			c.set({score: score});
			c.save();
		});
		this.checkOrder();
	},
	
	checkOrder: function() {
		var old_array, new_array, order_changed = false;
		old_array = _.toArray(this);
		this.sort();
		new_array = _.toArray(this);
		
		for (i = 0; i < new_array.length; i++) {
			if (new_array[i] !== old_array[i]) {
				order_changed = true;
				break;
			}
		}
		
		if (order_changed) {
			this.trigger('reorder');
		}
	},
	
	achievement: function(user, achievements, user_achievements, issue) {
		user_achievements.addOrUpdate(user, achievements.where({id: 7})[0], issue.get('id'));
	}
});
