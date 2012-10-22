Gangnam.Views.FeditsActive = Backbone.View.extend({
	
	template: JST['fedits/active'],
	
	events: {
		'click #revertedit' : 'revertEdit'		
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.fedit = this.attr.fedits.where({id: options.fedit.get('id')})[0];
		this.sources = this.attr.sources.where({fact_id: this.fedit.get('fact_id')});
	},
	
	render: function() {
		var self = this;
		$(this.el).html(this.template({
			fedit: this.fedit,
			sources: this.sources
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
			is_active: true
		});
		$(this.el).find('#revert').html(view.render().el);
	},
	
	revertEdit: function(event) {
		var fact = this.attr.facts.where({id: this.fedit.get('fact_id')})[0];
		fact.updateFromFedit(this.fedit);
		this.attr.sources.updateFromFedit(this.fedit);
	}
});