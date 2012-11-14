Gangnam.Views.PagesAbout = Backbone.View.extend({
	
	template: JST['pages/about'],
	id: 'about',
	
	events: {
		'click #explore' : 'openBox',
		'mouseover .logo' : 'fadeIn',
		'mouseover .portrait' : 'fadeIn',
		'mouseout .panel' : 'fadeOut',
		'click #issues' : 'issuesIndex'
	},
	
	initialize: function(options) {
		this.time = 500;
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
					$(old_ele).find('.alt-about-panel').css('display', 'none');
				}, this.time);
			}
		}
		$(new_ele).addClass('open');
		$(new_ele).find('.panels').css('display', 'block');
		$(new_ele).find('.alt-about-panel').css('display', 'block');
		$(old_ele).find('.panels').animate({
			height: "0px"
		}, this.time);
		$(old_ele).find('.alt-about-panel').animate({
			height: "0px"
		}, this.time);
		$(old_ele).find('#arrows').find('.down').animate({
			opacity: "0"
		}, this.time);
		$(old_ele).find('#arrows').find('.right').animate({
			opacity: "1"
		}, this.time);
		$(new_ele).find('.panels').animate({
			height: "130px"
		}, this.time);
		$(new_ele).find('.what-to-do').animate({
			height: "80px"
		}, this.time);
		$(new_ele).find('.disagree').animate({
			height: "47px"
		}, this.time);
		$(new_ele).find('.factory').animate({
			height: "80px"
		}, this.time);
		$(new_ele).find('.good-question').animate({
			height: "695px"
		}, this.time);
		$(new_ele).find('.contact').animate({
			height: "47px"
		}, this.time);
		$(new_ele).find('.how-to-help').animate({
			height: "95px"
		}, this.time);
		$(new_ele).find('.opinion').animate({
			height: "47px"
		}, this.time);
		$(new_ele).find('.hate-facts').animate({
			height: "47px"
		}, this.time);
		$(new_ele).find('.grey-out').animate({
			height: "65px"
		}, this.time);
		$(new_ele).find('.ranking-system').animate({
			height: "80px"
		}, this.time);
		$(new_ele).find('.facts-important').animate({
			height: "150px"
		}, this.time);
		$(new_ele).find('.who-are-you').animate({
			height: "220px"
		}, this.time);
		$(new_ele).find('#arrows').find('.down').animate({
			opacity: "1"
		}, this.time);
		$(new_ele).find('#arrows').find('.right').animate({
			opacity: "0"
		}, this.time);
	},
	
	openFirst: function() {
		var element = $('#monkeys').children().get()[0];

		$(element).addClass('open');
		$(element).find('.panels').css('display', 'block');
		$(element).find('.panels').animate({
			height: "130px"
		}, this.time);
		$(element).find('#arrows').find('.down').animate({
			opacity: "1"
		}, this.time);
		$(element).find('#arrows').find('.right').animate({
			opacity: "0"
		}, this.time);
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
		}, this.time);
		$(inactive).find('.portrait').animate({
			right: "10px"
		}, this.time);
		$(inactive).find('.logo').animate({
			right: "10px"
		}, this.time);
		$(active).find('.portrait').animate({
			right: "10px"
		}, this.time);
		$(active).find('.logo').animate({
			right: "10px"
		}, this.time);
		$(inactive).animate({
			opacity: "0"
		}, this.time);
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
		}, this.time);
		$(inactive).find('.portrait').animate({
			right: "171px"
		}, this.time);
		$(inactive).find('.logo').animate({
			right: "171px"
		}, this.time);
		$(active).find('.portrait').animate({
			right: "171px"
		}, this.time);
		$(active).find('.logo').animate({
			right: "171px"
		}, this.time);
		$(inactive).animate({
			opacity: "1"
		}, this.time);
	},
	
	issuesIndex: function() {
		Backbone.history.navigate('issues', true);
	}
});