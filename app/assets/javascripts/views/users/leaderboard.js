Gangnam.Views.UsersLeaderboard = Backbone.View.extend({
	
	template: JST['users/leaderboard'],
	
	events: {
		'click .leaderboard_name' : 'userShow'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.issue = this.attr.issues.where({id: options.issue.get('id')})[0];
	},
	
	render: function() {
		var self = this;
		$(this.el).addClass('issue_leaderboard_container');
		$(this.el).html(this.template());
		setTimeout(function() {
			for(i = 0; i < 5; i++) {
				self.appendLeaderboard(i);
			}
		}, 0);
		return this;
	},
	
	appendLeaderboard: function(loc) {
		var view = new Gangnam.Views.ReputationsLeaderboard({
			attr: this.attr,
			issue: this.issue,
			loc: loc
		});
		$('#leaderboard').append(view.render().el);
	},
	
	userShow: function() {
		var element = $(event.target).closest('.leaderboard_name');
		
		Backbone.history.navigate('users' + parseInt($(element).attr('id')), true);		
	}
});