Gangnam.Views.ReputationsProfile = Backbone.View.extend({
	
	template: JST['reputations/profile'],

	initialize: function(options) {
		this.attr = options.attr;
		this.issue = this.attr.issues.where({id: options.issue.get('id')})[0];
		this.user = this.attr.users.where({id: options.user.get('id')})[0];
		
		this.attr.users.on('reset', this.render, this);
		this.attr.users.on('add', this.render, this);
	},
	
	render: function() {
		$(this.el).html(this.template({
			rank: this.attr.reputations.getIssueRank(this.user, this.issue, this.attr.reputations),
			user: this.user
		}));
		return this;
	}
});