Gangnam.Views.PagesHome = Backbone.View.extend({
	
	template: JST['pages/home'],
	id: 'homepage',
	
	events: {
		'click #img1' : 'image1',
		'click #img2' : 'image2',
		'click #img3' : 'image3'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.current_user = this.attr.users.where({id: this.attr.current_user.get('id')})[0];
	},
	
	render: function() {
		var self = this;
		$(this.el).addClass('static');
		$(this.el).html(this.template({
			
		}));
		setTimeout(function() {
			self.slider();
		}, 0);
		return this;
	},
	
	slider: function() {
		var self = this;
		$('#slider').cycle('stop');
		$('#nav').children().remove();
		$('#slider').cycle({
			fx: 'scrollLeft',
			pager: '#nav',
			easeIn: 'easeInExpo',
			easeOut: 'easeInExpo',
		});
	},
	
	image1: function() {
		var view = new Gangnam.Views.PopupsAutocomplete({
			
		});
		$('#popup_container').html(view.render().el);
	},
	
	image2: function() {

	},
	
	image3: function() {
		$('#slider').cycle('stop');
		Backbone.history.navigate('issues', true);
	}
});
