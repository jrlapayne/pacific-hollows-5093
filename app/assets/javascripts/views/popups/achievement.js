Gangnam.Views.PopupsAchievement = Backbone.View.extend({
	
	template: JST['popups/achievement'],
	
	events: {
		'click #popup' : 'slideUp'
	},
	
	initialize: function(options) {
		this.achievement = options.achievement;
		this.amount = options.amount;
	},
	
	render: function() {
		var self = this;
		$(this.el).addClass('popup wrapper');
		$(this.el).html(this.template({
			achievement: this.achievement,
			amount: this.amount
		}));
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
		var self = this;
		$(this.el).animate({
			top: '-60px'
		}, 500);
		
		setTimeout(function() {
			$(self.el).remove();
		}, 500);
	}
});