Gangnam.Views.PagesHeader = Backbone.View.extend({

	template: JST['pages/header'],
	
	events: {
		'click #top_logo' : 'pagesHome'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
	},
	
	render: function() {
		$(this.el).html(this.template());
		return this;
	},
	
	pagesHome: function() {
		Backbone.history.navigate('', true);
	}
});