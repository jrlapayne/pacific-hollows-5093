Gangnam.Views.PopupsNeedPrivilege = Backbone.View.extend({
	
	template: JST['popups/need_privilege'],
	
	events: {
		'click #popup' : 'slideUp',
		'click #more' : 'pagesAbout'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.privilege = options.privilege;
		this.user = this.attr.users.where({id: options.user.get('id')})[0];
	},
	
	render: function() {
		var self = this;
		$(this.el).addClass('popup outer');
		$(this.el).html(this.template({
			privilege: this.privilege
		}));
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
		if (event && $(event.target).attr('id') === 'more') {
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
	
	pagesAbout: function() {
		Backbone.history.navigate('about', true);
		this.slideUp();
	}
});