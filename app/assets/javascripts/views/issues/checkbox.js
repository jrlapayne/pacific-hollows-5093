Gangnam.Views.IssuesCheckbox = Backbone.View.extend({
	
	template: JST['issues/checkbox'],
	
	events: {
		'click .checkbox' : 'filterQuestions'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.issue = options.issue;
		this.is_checked = false;
		
		for (m = 0; m < window.factory.length; m++) {
			if (this.issue.get('id') === window.factory[m]) {
				this.is_checked = true;
				break;
			}
		}
	},
	
	render: function() {
		$(this.el).html(this.template({
			issue: this.issue,
			is_checked: this.is_checked
		}));
		return this;
	},
	
	filterQuestions: function(event) {
		window.factory = [];
		var elements = $('.checkbox').get();

		for (n = 0; n < elements.length; n++) {
			if ($(elements[n]).attr('checked')) {
				window.factory.push(parseInt($(elements[n]).attr('id')));
			}
		}
		window.factory.length;
		this.attr.issues.trigger('filter');
	}
});