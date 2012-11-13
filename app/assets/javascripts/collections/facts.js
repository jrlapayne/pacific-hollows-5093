Gangnam.Collections.Facts = Backbone.Collection.extend({
	
	model: Gangnam.Models.Fact,
	url: 'facts',
	
	comparator: function(fact) {
		return - fact.get('score');
	},
	
	resetScore: function(vote) {
		var score = 0, fact;
		fact = this.where({id: vote.get('fact_id')})[0];
		
		fact.set({score: fact.get('score') + vote.get('value')});
		fact.save();
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
		user_achievements.addOrUpdate(user, achievements.where({id: 3})[0], issue.get('id'));
	}
});
