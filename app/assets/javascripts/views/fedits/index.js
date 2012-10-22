Gangnam.Views.FeditsIndex = Backbone.View.extend({
	
	template: JST['fedits/index'],
	id: 'fedits',
	
	events: {
		'click .feditpanel' : 'activateFedit',
		'click #back' : 'renderCreate'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.fact = this.attr.facts.where({id: options.fact.get('id')})[0];
		this.fedits = this.attr.fedits.where({fact_id: this.fact.get('id')});
	},
	
	render: function() {
		var self = this;
		$(this.el).html(this.template());
		setTimeout(function() {
			for (i = 0; i < self.fedits.length; i++) {
				self.appendFedit(self.fedits[i]);
			}
		}, 0);
		return this;
	},
	
	appendFedit: function(fedit) {
		var view = new Gangnam.Views.FeditsShow({
			attr: this.attr,
			fedit: fedit
		});
		$('#fedits').append(view.render().el);
		this.renderInactive($('#fedits').find('#' + fedit.get('id')));
	},
	
	activateFedit: function(event) {
		if ($(event.target).closest('.feditpanel').hasClass('active')) {
			return;
		}
		var elements, element;

		element = $(event.target).closest('.feditpanel');
		elements = $('.feditpanel').get();
		for (i = 0; i < elements.length; i++) {
			if ($(elements[i]).hasClass('active')) {
				this.renderInactive(elements[i]);
			}
		}
		this.renderActive(element);
	},
	
	renderActive: function(element) {
		var fedit_id = parseInt($(element).attr('id'));
		var view = new Gangnam.Views.FeditsActive({
			attr: this.attr,
			fedit: this.attr.fedits.where({id: fedit_id})[0]
		});
		
		$(element).children().remove();
		$(element).addClass('active');
		$(element).html(view.render().el);
	},
	
	renderInactive: function(element) {
		var fedit_id = parseInt($(element).attr('id'));
		var view = new Gangnam.Views.FeditsInactive({
			attr: this.attr,
			fedit: this.attr.fedits.where({id: fedit_id})[0]
		});	
		
		$(element).children().remove();
		$(element).removeClass('active');
		$(element).html(view.render().el);	
	},
	
	renderCreate: function() {
		var element = $(this.el).closest('.fact-box');
		var view = new Gangnam.Views.FeditsCreate({
			attr: this.attr,
			fact: this.fact
		});
		
		$(element).children().remove();
		$(element).html(view.render().el);
	}
});
