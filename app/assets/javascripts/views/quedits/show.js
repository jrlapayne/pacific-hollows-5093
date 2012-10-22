Gangnam.Views.QueditsShow = Backbone.View.extend({
		
	initialize: function(options) {
		this.attr = options.attr;
		this.quedit = options.quedit;
	},
	
	render: function() {
		$(this.el).attr('id', this.quedit.get('id'));
		$(this.el).addClass('queditpanel border');
		return this;
	}
});