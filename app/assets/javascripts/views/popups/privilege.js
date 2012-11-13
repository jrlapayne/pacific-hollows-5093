Gangnam.Views.PopupsPrivilege = Backbone.View.extend({
	
	template: JST['popups/privilege'],
	
	events: {
		'click #popup' : 'slideUp'
	},
	
	initialize: function(options) {
		this.privilege = options.privilege;
	},
	
	render: function() {
		var self = this;
		$(this.el).addClass('popup outer');
		$(this.el).html(this.template({
			privilege: this.privilege
		}));
		setTimeout(function() {
			self.slideDown();
		}, 0);
		return this;
	},
	
	slideDown: function() {
		$(this.el).animate({
			top: '80px'
		}, 500);
	},
	
	slideUp: function() {
		var self = this;
		$(this.el).animate({
			top: '0'
		}, 500);
		
		setTimeout(function() {
			$(self.el).remove();
		}, 500);
	}
});