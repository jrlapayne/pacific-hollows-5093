Gangnam.Views.AutocompletesUserResult = Backbone.View.extend({

	template: JST['autocompletes/user_result'],
	
	events: {
		
	},
	
	initialize: function(options) {
		this.title = options.title;
		this.user = options.user;
	},
	
	render: function() {
		$(this.el).addClass('autocom-result');
		$(this.el).attr('id', this.user.get('id'));
		$(this.el).html(this.template({
			title: this.title,
			user: this.user
		}));
		return this;
	}
});