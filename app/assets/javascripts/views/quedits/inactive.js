Gangnam.Views.QueditsInactive = Backbone.View.extend({
	
	template: JST['quedits/inactive'],
	
	initialize: function(options) {
		this.attr = options.attr;
		this.quedit = this.attr.quedits.where({id: options.quedit.get('id')})[0];
		this.subviews = [];
	},
	
	render: function() {
		var self = this;
		$(this.el).html(this.template({
			quedit: this.quedit
		}));
		setTimeout(function() {
			self.renderRevert();
		}, 0);
		return this;
	},
	
	renderRevert: function() {
		var view = new Gangnam.Views.QueditsRevert({
			attr: this.attr,
			quedit: this.quedit,
			is_active: false
		});
		this.subviews.push(view);
		$(this.el).find('#revert').html(view.render().el);
	},
	
	onClose: function() {
		_.each(this.subviews, function(view) {
			view.remove();
			view.unbind();
			
			if (view.onClose) {
				view.onClose();
			}
		});
	}
});