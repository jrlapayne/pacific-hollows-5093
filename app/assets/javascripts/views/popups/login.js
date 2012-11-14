Gangnam.Views.PopupsLogin = Backbone.View.extend({
	
	template: JST['popups/login'],
	
	events: {
		'click #facebook' : 'facebookLogin',
		'click #google' : 'googleLogin',
		'click #twitter' : 'twitterLogin',
		'click #close' : 'closePopup'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
	},
	
	render: function() {
		$(this.el).addClass('backdrop');
		$(this.el).html(this.template());
		return this;
	},
	
	facebookLogin: function() {
		$(this.el).remove();
		//window.location = "http://localhost:3000/auth/facebook";
		//window.location = "http://pacific-hollows-5093.herokuapp.com/auth/facebook";
		window.location = "http://fusegap.org/auth/facebook";
	},
	
	googleLogin: function() {
		$(this.el).remove();
		//window.location = "http://localhost:3000/auth/google";
		//window.location = "http://pacific-hollows-5093.herokuapp.com/auth/google";
		window.location = "http://fusegap.org/auth/google";
	},
	
	twitterLogin: function() {
		$(this.el).remove();
		//window.location = "http://localhost:3000/auth/twitter";
		//window.location = "http://pacific-hollows-5093.herokuapp.com/auth/twitter";
		window.location = "http://fusegap.org/auth/twitter";
	},
	
	closePopup: function() {
		$(this.el).remove();
	}
});