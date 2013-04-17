Gangnam.Models.Fact = Backbone.Model.extend({
	
	validate: function(attr) {
		
	},
	
	updateFromFedit: function(fedit) {
		this.set({
			title: fedit.get('title'),
			description: fedit.get('description'),
			edit_id: fedit.get('id')
		});
		this.save();
	},
	
	testMe: function() {
		alert(this.collection.length);
	}
});
