Gangnam.Views.ReputationsIssue = Backbone.View.extend({
	
	template: JST['reputations/issue'],

	initialize: function(options) {
		this.attr = options.attr;
		this.issue = this.attr.issues.where({id: options.issue.get('id')})[0];
		this.current_user = this.attr.current_user;
		
		this.attr.users.on('reset', this.render, this);
		this.attr.users.on('add', this.render, this);
	},
	
	render: function() {
		$(this.el).html(this.template({
			rank: this.attr.reputations.getIssueRank(this.current_user, this.issue),
			user: this.attr.users.where({id: this.current_user.get('id')})[0]
		}));
		return this;
	}
});