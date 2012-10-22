Gangnam.Views.SourcesShow = Backbone.View.extend({
	
	template: JST['sources/show'],
	
	events: {
		
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.source = this.attr.sources.where({id: options.source.get('id')})[0];
	},
	
	render: function() {
		$(this.el).addClass('source container');
		$(this.el).html(this.template({
			source: this.source
		}));
		return this;
	}
});