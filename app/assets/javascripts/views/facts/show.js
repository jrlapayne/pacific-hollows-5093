Gangnam.Views.FactsShow = Backbone.View.extend({
	
	initialize: function(options) {
		this.attr = options.attr;
		this.fact = options.fact;
		this.facts = options.facts;
	},
	
	render: function() {
		$(this.el).attr('id', this.fact.get('id'));
		$(this.el).addClass('panel fact');
		if (this.fact.get('id') === this.facts[0].get('id')) {
			$(this.el).addClass('top');
		}
		if (this.fact.get('id') === this.facts[this.facts.length - 1].get('id')) {
			$(this.el).addClass('bottom');
		}
		return this;
	}
});