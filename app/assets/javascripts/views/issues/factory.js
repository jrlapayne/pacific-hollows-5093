Gangnam.Views.IssuesFactory = Backbone.View.extend({
	
	template: JST['issues/factory'],
	
	events: {
		
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.issues = _.toArray(this.attr.issues);
	},
	
	render: function() {
		var self = this;
		setTimeout(function(){
			for(i = 0; i < self.issues.length; i++) {
				self.appendIssue(self.issues[i]);
			}
		}, 0);
		return this;
	},
	
	appendIssue: function(issue) {
		var view = new Gangnam.Views.IssuesCheckbox({
			attr: this.attr,
			issue: issue
		});
		$(this.el).append(view.render().el);
	}
});