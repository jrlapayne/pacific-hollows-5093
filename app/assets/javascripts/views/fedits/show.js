Gangnam.Views.FeditsShow = Backbone.View.extend({
		
	initialize: function(options) {
		this.attr = options.attr;
		this.fedit = options.fedit;
	},
	
	render: function() {
		$(this.el).attr('id', this.fedit.get('id'));
		$(this.el).addClass('feditpanel border');
		return this;
	}
});