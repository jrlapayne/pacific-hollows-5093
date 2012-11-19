Gangnam.Views.CommentsReply = Backbone.View.extend({
	
	template: JST['comments/reply'],
	
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