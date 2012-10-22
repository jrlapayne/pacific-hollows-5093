Gangnam.Models.Question = Backbone.Model.extend({
	
	updateFromQuedit: function(quedit) {
		this.set({
			title: quedit.get('title'),
			description: quedit.get('description'),
			category: quedit.get('category'),
			edit_id: quedit.get('id')
		});
		this.save();
	}
});
