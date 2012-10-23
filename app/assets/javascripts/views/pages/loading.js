Gangnam.Views.PagesLoading = Backbone.View.extend({
	
	template: JST['pages/loading'],
	
	render: function() {
		var self = this;
		$(this.el).html(this.template());
		setTimeout(function() {
			self.resetLoading();
		}, 0);
		return this;
	},
	
	loading: function() {
		$('#ball1').animate({
			opacity: "0"
		}, 1000);
		setTimeout(function() {
			$('#ball2').animate({
				opacity: "0"
			}, 1000);
		}, 125);
		setTimeout(function() {
			$('#ball3').animate({
				opacity: "0"
			}, 1000);
		}, 250);
		setTimeout(function() {
			$('#ball4').animate({
				opacity: "0"
			}, 1000);
		}, 375);
		setTimeout(function() {
			$('#ball5').animate({
				opacity: "0"
			}, 1000);
		}, 500);
		setTimeout(function() {
			$('#ball6').animate({
				opacity: "0"
			}, 1000);
		}, 625);
		setTimeout(function() {
			$('#ball7').animate({
				opacity: "0"
			}, 1000);
		}, 750);
		setTimeout(function() {
			$('#ball8').animate({
				opacity: "0"
			}, 1000);
		}, 875);
		
		var self = this;
		setTimeout(function() {
			self.resetLoading();
		}, 1001);
	},
	
	resetLoading: function() {
		$('#ball1').animate({
			opacity: "1"
		}, 0);
		setTimeout(function() {
			$('#ball2').animate({
				opacity: "1"
			}, 0);
		}, 125);
		setTimeout(function() {
			$('#ball3').animate({
				opacity: "1"
			}, 0);
		}, 250);
		setTimeout(function() {
			$('#ball4').animate({
				opacity: "1"
			}, 0);
		}, 375);
		setTimeout(function() {
			$('#ball5').animate({
				opacity: "1"
			}, 0);
		}, 500);
		setTimeout(function() {
			$('#ball6').animate({
				opacity: "1"
			}, 0);
		}, 625);
		setTimeout(function() {
			$('#ball7').animate({
				opacity: "1"
			}, 0);
		}, 750);
		setTimeout(function() {
			$('#ball8').animate({
				opacity: "1"
			}, 0);
		}, 875);
		
		this.loading();
	}
});