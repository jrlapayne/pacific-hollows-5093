Gangnam.Collections.Issues = Backbone.Collection.extend({
	
	model: Gangnam.Models.Issue,
	url: 'issues',
	
	comparator: function(issue) {
		return - issue.get('score');
	}
});
