Gangnam.Views.PagesHeader = Backbone.View.extend({

	template: JST['pages/header'],
	
	events: {
		'click #top_logo' : 'pagesHome',
		'click #facebook' : 'facebookLogin',
		'click #google' : 'googleLogin',
		'click #twitter' : 'twitterLogin'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
	},
	
	render: function() {
		$(this.el).html(this.template({
			current_user: this.attr.current_user
		}));
		return this;
	},
	
	pagesHome: function() {
		Backbone.history.navigate('', true);
	},
	
	facebookLogin: function() {
		window.location = "http://localhost:3000/auth/facebook";
	},
	
	googleLogin: function() {
		window.location = "http://localhost:3000/auth/google";
	},
	
	twitterLogin: function() {
		window.location = "http://localhost:3000/auth/twitter";
	}
});