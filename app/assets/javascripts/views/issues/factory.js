Gangnam.Views.IssuesFactory = Backbone.View.extend({
	
	template: JST['issues/factory'],
	
	events: {
		'click #toggle' : 'toggleChecked'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.issues = _.toArray(this.attr.issues);
		this.subviews = [];
		this.all_checked = true;
	},
	
	render: function() {
		var self = this;
		$(this.el).html(this.template({
			all_checked: this.all_checked
		}));
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
		this.subviews.push(view);
		$(this.el).append(view.render().el);
	},
	
	toggleChecked: function() {
		if (this.all_checked === true) {
			this.all_checked = false;
			window.factory = [];
		} else {
			this.all_checked = true;
			for (i = 0; i < this.issues.length; i++) {
				window.factory.push(this.issues[i].get('id'));
			}
		}
		$(this.el).children().remove();
		this.render();
		this.attr.issues.trigger('filter');
	},
	
	onClose: function() {
		_.each(this.subviews, function(view) {
			view.remove();
			view.unbind();
			
			if (view.onClose) {
				view.onClose();
			}
		});
	}
});