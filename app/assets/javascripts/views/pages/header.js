Gangnam.Views.PagesHeader = Backbone.View.extend({

	template: JST['pages/header'],
	
	events: {
		'click #top_logo' : 'pagesHome',
		'click #login' : 'loginPopup'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
	},
	
	render: function() {
		var self = this;
		$(this.el).html(this.template({
			current_user: this.attr.current_user
		}));
		setTimeout(function() {
			self.slider();
		}, 0)
		return this;
	},
	
	pagesHome: function() {
		Backbone.history.navigate('', true);
	},
	
	loginPopup: function() {
		var view = new Gangnam.Views.PopupsLogin({
			attr: this.attr
		});
		$('#login_popup').html(view.render().el);
	},
	
	slider: function() {
		$('#interesting').cycle('stop');
		$('#interesting').cycle({
			fx: 'fade',
			timeout: 0,
			prev: '#int_prev',
			next: '#int_next'
		});
	}
});