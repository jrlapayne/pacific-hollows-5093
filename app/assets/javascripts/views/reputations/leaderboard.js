Gangnam.Views.ReputationsLeaderboard = Backbone.View.extend({
	
	template: JST['reputations/leaderboard'],
	
	events: {

	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.issue = this.attr.issues.where({id: options.issue.get('id')})[0];
		this.loc = options.loc;
		
		this.attr.users.on('reset', this.render, this);
		this.attr.users.on('add', this.render, this);
	},
	
	render: function() {
		$(this.el).html(this.template({
			user: this.getUser(this.issue, this.loc),
			place: this.loc
		}));
		return this;
	},
	
	getUser: function(issue, place) {
		var users = this.attr.users, reps = this.attr.reputations.where({issue_id: issue.get('id')});
		
		reps.sort(function(a, b) {
			return b.get('rep') - a.get('rep');
		});
		
		return users.where({id: reps[place].get('user_id')})[0];
	}
});