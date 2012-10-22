Gangnam.Views.FeditsInactive = Backbone.View.extend({
	
	template: JST['fedits/inactive'],
	
	initialize: function(options) {
		this.attr = options.attr;
		this.fedit = this.attr.fedits.where({id: options.fedit.get('id')})[0];
	},
	
	render: function() {
		var self = this;
		$(this.el).html(this.template({
			fedit: this.fedit
		}));
		setTimeout(function() {
			self.renderRevert();
		}, 0);
		return this;
	},
	
	renderRevert: function() {
		var view = new Gangnam.Views.FeditsRevert({
			attr: this.attr,
			fedit: this.fedit,
			is_active: false
		});
		$(this.el).find('#revert').html(view.render().el);
	}
});