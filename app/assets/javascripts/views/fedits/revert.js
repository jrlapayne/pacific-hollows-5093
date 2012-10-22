Gangnam.Views.FeditsRevert = Backbone.View.extend({
	
	template: JST['fedits/revert'],
	
	initialize: function(options) {
		this.attr = options.attr;
		this.fedit = this.attr.fedits.where({id: options.fedit.get('id')})[0];
		this.fact = this.attr.facts.where({id: options.fedit.get('fact_id')})[0];
		this.is_active = options.is_active;
	},
	
	render: function() {
		$(this.el).html(this.template({
			fact: this.fact,
			fedit: this.fedit,
			is_active: this.is_active
		}));
		return this;
	}
});