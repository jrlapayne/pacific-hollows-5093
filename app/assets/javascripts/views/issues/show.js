Gangnam.Views.IssuesShow = Backbone.View.extend({

	template: JST['issues/show'],
	
	events: {
		
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.issue = this.attr.issues.where({id: options.issue.get('id')})[0];
		this.category = options.category;
	},
	
	render: function() {
		var self = this;
		$(this.el).addClass('panel issue');
		$(this.el).html(this.template({
			issue: this.issue
		}));
		return this;
	}
});