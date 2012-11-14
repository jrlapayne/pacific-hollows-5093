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
			self.testimonials();
		}, 0);
		return this;
	},
	
	slider: function() {
		var self = this;
		$('#slider').cycle('stop');
		$('#nav').children().remove();
		$('#slider').cycle({
			fx: 'scrollLeft',
			timeout: '7100',
			pager: '#nav',
			easeIn: 'easeInExpo',
			easeOut: 'easeInExpo',
		});
	},
	
	testimonials: function() {
		$('#testimonials').cycle('stop');
		$('#testimonials').cycle({
			fx: 'fade',
			speed: '500',
			timeout: '6100'
		});
	},
	
	image1: function() {
		var view = new Gangnam.Views.PopupsAchievement({
			achievement: this.attr.achievements.where({id: 1})[0],
			amount: 10
		});
		$('.page').find('.popup').html(view.render().el);
	},
	
	image2: function() {

	},
	
	image3: function() {
		$('#slider').cycle('stop');
		$('#testimonials').cycle('stop');
		Backbone.history.navigate('mission', true);
	}
});
