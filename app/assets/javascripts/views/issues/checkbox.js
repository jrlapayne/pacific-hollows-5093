Gangnam.Views.IssuesCheckbox = Backbone.View.extend({
	
	template: JST['issues/checkbox'],
	
	events: {
		'click .checkbox' : 'filterQuestions'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.issue = options.issue;
		this.is_checked = false;
		
		for (i = 0; i < window.factory.length; i++) {
			if (this.issue.get('id') === window.factory[i]) {
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
		
		for (j = 0; j < elements.length; j++) {
			if ($(elements[j]).attr('checked')) {
				window.factory.push(parseInt($(elements[j]).attr('id')));
			}
		}
		
		this.attr.issues.trigger('filter');
	}
});