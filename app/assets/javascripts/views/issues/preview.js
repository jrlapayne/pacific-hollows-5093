Gangnam.Views.IssuesPreview = Backbone.View.extend({
	
	template: JST['issues/preview'],
	
	events: {

	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.issue = this.attr.issues.where({id: options.issue.get('id')})[0];
		this.current_user = this.attr.users.where({id: this.attr.current_user.get('id')})[0];
		
		this.attr.issues.on('reset', this.render, this);
		this.attr.users.on('add', this.render, this);
	},
	
	render: function() {
		$(this.el).attr('id', this.issue.get('id'));
		$(this.el).addClass('panel issue preview');
		$(this.el).html(this.template({
			issue: this.issue,
			current_user: this.current_user,
			rank: this.attr.users.getIssueRank(this.current_user, this.issue, this.attr.reputations)
		}));
		return this;
	}
});