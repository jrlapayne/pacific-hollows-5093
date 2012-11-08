Gangnam.Views.ReputationsGlobal = Backbone.View.extend({
	
	template: JST['reputations/global'],
	
	initialize: function(options) {
		this.attr = options.attr;
		this.user = this.attr.users.where({id: options.user.get('id')})[0];
		
		this.attr.users.on('reset', this.render, this);
		this.attr.users.on('add', this.render, this);
	},
	
	render: function() {
		$(this.el).html(this.template({
			rank: this.attr.users.getRank(this.user),
			user: this.user
		}));
		return this;
	}
});