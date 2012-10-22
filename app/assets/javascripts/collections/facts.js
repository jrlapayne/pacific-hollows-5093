Gangnam.Collections.Facts = Backbone.Collection.extend({
	
	model: Gangnam.Models.Fact,
	url: 'facts',
	
	comparator: function(fact) {
		return - fact.get('score');
	},
	
	resetScores: function(votes) {
		var score, fact_votes;
		this.each(function(f) {
			score = 0;
			fact_votes = votes.where({question_id: f.get('question_id'), fact_id: f.get('fact_id'), comment_id: null});
			for (i = 0; i < fact_votes.length; i++) {
				score = score + fact_votes[i].get('value');
			}
			f.set({score: score});
			f.save();
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
	}
});
