Gangnam.Views.IssuesCategories = Backbone.View.extend({
	
	template: JST['issues/categories'],
	id: 'categories',
	
	events: {
		'click #pros' : 'showPros',
		'click #cons' : 'showCons',
		'click #basics' : 'showBasics'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.issue = options.issue;
	},
	
	render: function() {
		$(this.el).addClass('category container');
		$(this.el).html(this.template({
			
		}));
		return this;
	},
	
	showPros: function() {
		var element = $('#categories').children('.middle');
		var self = this;
		
		if ($(element).attr('id') === "pros") {
			return;
		}
		
		if ($('#pros').hasClass('top')) {
			this.animateCategory($('#pros'), element, true);
		} else {
			this.animateCategory($('#pros'), element, false);
		}
		setTimeout(function() {
			Backbone.history.navigate('issue' + self.issue.get('id') + '/pros', true);
		}, 500);
	},
	
	showCons: function() {
		var element = $('#categories').children('.middle');
		var self = this;
		
		if ($(element).attr('id') === "cons") {
			return;
		}
		
		if ($('#cons').hasClass('top')) {
			this.animateCategory($('#cons'), element, true);
		} else {
			this.animateCategory($('#cons'), element, false);
		}
		setTimeout(function() {
			Backbone.history.navigate('issue' + self.issue.get('id') + '/cons', true);
		}, 500);
	},
	
	showBasics: function() {
		var element = $('#categories').children('.middle');
		var self = this;
		
		if ($(element).attr('id') === "basics") {
			return;
		}
		
		if ($('#basics').hasClass('top')) {
			this.animateCategory($('#basics'), element, true);
		} else {
			this.animateCategory($('#basics'), element, false);
		}
		setTimeout(function() {
			Backbone.history.navigate('issue' + self.issue.get('id') + '/basics', true);
		}, 500);
	},
	
	animateCategory: function(new_ele, old_ele, is_top) {
		var time = 500;
		$(new_ele).css('z-index', '1');
		$(old_ele).css('z-index', '0');
		
		if (is_top) {
			$(old_ele).animate({
				top: "0",
				height: "50px"
			}, time);

			$(old_ele).find('#arrow').animate({
				opacity: "0"
			}, time);
			
			$(new_ele).animate({
				top: "50px",
				height: "100px"
			}, time);
			
			$(old_ele).addClass('top');
			$(new_ele).removeClass('top');
		} else {		
			$(old_ele).animate({
				top: "150px",
				height: "50px"
			}, time);
			
			$(old_ele).find('#arrow').animate({
				opacity: "0"
			}, time);
			
			$(new_ele).animate({
				top: "-=100px",
				height: "100px"
			}, time);
			
			$(old_ele).addClass('bottom');
			$(new_ele).removeClass('bottom');
		}
		$(new_ele).find('#arrow').animate({
			opacity: "1"
		}, time);
		
		$(old_ele).removeClass('middle');
		$(new_ele).addClass('middle');
	}
});