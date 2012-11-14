Gangnam.Views.PopupsSignin = Backbone.View.extend({
	
	template: JST['popups/signin'],
	
	events: {
		'click #popup' : 'slideUp',
		'click #login' : 'popupsLogin'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.user = this.attr.users.where({id: options.user.get('id')})[0];
	},
	
	render: function() {
		var self = this;
		$(this.el).addClass('popup outer');
		$(this.el).html(this.template());
		setTimeout(function() {
			self.slideDown();
		}, 0);
		return this;
	},
	
	slideDown: function() {
		$(this.el).animate({
			top: '80px'
		}, 500);
	},
	
	slideUp: function(event) {
		if (event && $(event.target).attr('id') === 'login') {
			return;
		}
		var self = this;
		$(this.el).animate({
			top: '0'
		}, 500);
		
		setTimeout(function() {
			$(self.el).remove();
		}, 500);
	},
	
	popupsLogin: function() {
		var view = new Gangnam.Views.PopupsLogin({
			attr: this.attr
		});
		this.slideUp(null);
		$('#login_popup').html(view.render().el);
	}
});