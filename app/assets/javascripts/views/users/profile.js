Gangnam.Views.UsersProfile = Backbone.View.extend({
	
	id: 'user_profile',
	
	events: {
		
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.user = this.attr.users.where({id: options.user.get('id')})[0];
		this.subviews = [];
	},
	
	render: function() {
		var self = this;
		var issues = this.getIssues();
		setTimeout(function() {
			self.renderOverview();
			for (i = 0; i < issues.length; i++) {
				self.appendIssue(issues[i]);
			}
		}, 0);
		return this;
	},
	
	appendIssue: function(issue) {
		var view = new Gangnam.Views.UsersIssue({
			attr: this.attr,
			issue: issue,
			user: this.user
		});
		this.subviews.push(view);
		$('#user_profile').append(view.render().el);
	},
	
	getIssues: function() {
		var array = [];
		var issues = _.toArray(this.attr.issues);
	
		for (i = 0; i < issues.length; i++) {
			if (this.attr.reputations.where({issue_id: issues[i].get('id'), user_id: this.user.get('id')})[0]) {
				array.push(issues[i]);
			}	
		}
		
		return array;
	},
	
	renderOverview: function() {
		var view = new Gangnam.Views.UsersOverview({
			attr: this.attr,
			user: this.user
		});
		this.subviews.push(view);
		$('#left_top').html(view.render().el);
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