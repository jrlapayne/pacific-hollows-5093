Gangnam.Views.CommentsCreate = Backbone.View.extend({
	
	template: JST['comments/create'],
	
	events: {
		
	},
	
	initialize: function(options) {
		this.attr = options.attr;
	},
	
	render: function() {
		$(this.el).html(this.template());
		return this;
	}
});