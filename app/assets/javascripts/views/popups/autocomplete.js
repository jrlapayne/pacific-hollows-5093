Gangnam.Views.PopupsAutocomplete = Backbone.View.extend({
	
	template: JST['popups/autocomplete'],
	
	events: {
		'click #popup' : 'slideUp'
	},
	
	initialize: function(options) {
		
	},
	
	render: function() {
		var self = this;
		$(this.el).html(this.template());
		setTimeout(function() {
			self.slideDown();
		}, 0);
		return this;
	},
	
	slideDown: function() {
		$('#popup_container').animate({
			top: '0'
		}, 500);
	},
	
	slideUp: function() {
		$('#popup_container').animate({
			top: '-100px'
		}, 500);
	}
});