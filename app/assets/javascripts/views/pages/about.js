Gangnam.Views.PagesAbout = Backbone.View.extend({
	
	template: JST['pages/about'],
	id: 'about',
	
	events: {
		'click #explore' : 'openBox',
		'mouseover .logo' : 'fadeIn',
		'mouseover .portrait' : 'fadeIn',
		'mouseout .panel' : 'fadeOut'
	},
	
	initialize: function(options) {

	},
	
	render: function() {
		var self = this;
		$(this.el).addClass('static background-cover');
		$(this.el).html(this.template());
		setTimeout(function() {
			self.openFirst();
		}, 200);
		return this;
	},
	
	openBox: function(event) {
		var new_ele = $(event.target).closest('.comparison');
		var old_ele;
		var elements = $('#monkeys').children().get();
		
		if ($(new_ele).hasClass('open')) {
			return;
		}
		for (i = 0; i < elements.length; i++) {
			if ($(elements[i]).hasClass('open')) {
				old_ele = elements[i];
				$(old_ele).removeClass('open');
				setTimeout(function() {
					$(old_ele).find('.panels').css('display', 'none');
				}, 1000);
			}
		}
		$(new_ele).addClass('open');
		$(new_ele).find('.panels').css('display', 'block');
		$(old_ele).find('.panels').animate({
			height: "0px"
		}, 1000);
		$(old_ele).find('#arrows').find('.down').animate({
			opacity: "0"
		}, 1000);
		$(old_ele).find('#arrows').find('.right').animate({
			opacity: "1"
		}, 1000);
		$(new_ele).find('.panels').animate({
			height: "130px"
		}, 1000);
		$(new_ele).find('#arrows').find('.down').animate({
			opacity: "1"
		}, 1000);
		$(new_ele).find('#arrows').find('.right').animate({
			opacity: "0"
		}, 1000);
	},
	
	openFirst: function() {
		var element = $('#monkeys').children().get()[0];
		
		$(element).addClass('open');
		$(element).find('.panels').css('display', 'block');
		$(element).find('.panels').animate({
			height: "130px"
		}, 1000);
		$(element).find('#arrows').find('.down').animate({
			opacity: "1"
		}, 1000);
		$(element).find('#arrows').find('.right').animate({
			opacity: "0"
		}, 1000);
	},
	
	fadeIn: function(event) {
		var element = $(event.target).closest('.panel');
		var active, inactive;
	
		if (parseInt($(element).next().attr('id')) === parseInt($(element).attr('id'))) {
			inactive = element;
			active = $(element).next();
		} else {
			active = element;
			inactive = $(element).prev();
		}
		
		$(active).animate({
			opacity: "1"
		}, 1000);
		$(inactive).find('.portrait').animate({
			right: "10px"
		}, 1000);
		$(inactive).find('.logo').animate({
			right: "10px"
		}, 1000);
		$(active).find('.portrait').animate({
			right: "10px"
		}, 1000);
		$(active).find('.logo').animate({
			right: "10px"
		}, 1000);
		$(inactive).animate({
			opacity: "0"
		}, 1000);
	},
	
	fadeOut: function(event) {
		var element = $(event.target).closest('.panel');
		var active, inactive;
		if ($(event.relatedTarget).closest('.panel').attr('id')) {
			return;
		}
		if (parseInt($(element).next().attr('id')) === parseInt($(element).attr('id'))) {
			inactive = element;
			active = $(element).next();
		} else {
			active = element;
			inactive = $(element).prev();
		}
		
		$(active).animate({
			opacity: "0"
		}, 1000);
		$(inactive).find('.portrait').animate({
			right: "171px"
		}, 1000);
		$(inactive).find('.logo').animate({
			right: "171px"
		}, 1000);
		$(active).find('.portrait').animate({
			right: "171px"
		}, 1000);
		$(active).find('.logo').animate({
			right: "171px"
		}, 1000);
		$(inactive).animate({
			opacity: "1"
		}, 1000);
	}
});