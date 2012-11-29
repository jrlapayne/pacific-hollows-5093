Gangnam.Views.PopupsAutocomplete = Backbone.View.extend({
	
	template: JST['popups/autocomplete'],
	
	events: {
		'click #popup' : 'slideUp'
	},
	
	initialize: function(options) {

	},
	
	render: function() {
		var self = this;
		$(this.el).addClass('popup wrapper');
		$(this.el).html(this.template());
		setTimeout(function() {
			self.slideDown();
		}, 0);
		return this;
	},
	
	slideDown: function() {
		$(this.el).animate({
			top: '0'
		}, 500);
	},
	
	slideUp: function() {
		$(this.el).animate({
			top: '-60px'
		}, 500);
	}
});