Gangnam.Views.PagesNavbar = Backbone.View.extend({
	
	template: JST['pages/navbar'],
	
	events: {
		'click #issues' : 'issuesIndex',
		'click #factory' : 'factory',
		'click #about' : 'pagesAbout',
		'click #profile' : 'usersProfile'
	},

	render: function() {
		$(this.el).addClass('navigation')
		$(this.el).html(this.template());
		return this;
	},
	
	issuesIndex: function() {
		Backbone.history.navigate('issues', true);
	},
	
	factory: function() {
		//Backbone.history.navigate('factory', true);
	},
	
	pagesAbout: function() {
		Backbone.history.navigate('about', true);
	},
	
	usersProfile: function() {
		//Backbone.history.navigate('profile', true);
	}
});