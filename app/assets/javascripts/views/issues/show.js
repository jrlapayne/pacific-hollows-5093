Gangnam.Views.IssuesShow = Backbone.View.extend({

	template: JST['issues/show'],
	
	events: {
		'click #back' : 'goBack'
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
	},
	
	goBack: function() {
		if (window.location.hash.slice(1, 9) === 'question') {
			parent.history.back();
		} else {
			Backbone.history.navigate('issues', true);
		}
	}
});