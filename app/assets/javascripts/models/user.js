Gangnam.Models.User = Backbone.Model.extend({
	
	updateRep: function(amount) {
		this.set({rep: this.get('rep') + amount});
		this.save();
		
		//check for new privileges
	},
	
	canVote: function() {
		return true;
	}
});
