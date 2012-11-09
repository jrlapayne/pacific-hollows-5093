Gangnam.Views.AutocompletesIssueResult = Backbone.View.extend({

	template: JST['autocompletes/issue_result'],
	
	events: {
		
	},
	
	initialize: function(options) {
		this.title = options.title;
		this.issue = options.issue;
	},
	
	render: function() {
		$(this.el).addClass('autocom-result');
		$(this.el).attr('id', this.issue.get('id'));
		$(this.el).html(this.template({
			title: this.title,
			issue: this.issue
		}));
		return this;
	}
});