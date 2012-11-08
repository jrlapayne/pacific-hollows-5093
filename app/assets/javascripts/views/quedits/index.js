Gangnam.Views.QueditsIndex = Backbone.View.extend({
	
	template: JST['quedits/index'],
	id: 'quedits',
	
	events: {
		'click .queditpanel' : 'activateQuedit',
		'click #back' : 'renderCreate'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.question = this.attr.questions.where({id: options.question.get('id')})[0];
		this.quedits = this.attr.quedits.where({question_id: this.question.get('id')});
		this.subviews = [];
	},
	
	render: function() {
		var self = this;
		$(this.el).html(this.template());
		setTimeout(function() {
			for (i = 0; i < self.quedits.length; i++) {
				self.appendQuedit(self.quedits[i]);
			}
		}, 0);
		return this;
	},
	
	appendQuedit: function(quedit) {
		var view = new Gangnam.Views.QueditsShow({
			attr: this.attr,
			quedit: quedit
		});
		this.subviews.push(view);
		$('#quedits').append(view.render().el);
		this.renderInactive($('#quedits').find('#' + quedit.get('id')));
	},
	
	activateQuedit: function(event) {
		if ($(event.target).closest('.queditpanel').hasClass('active')) {
			return;
		}
		var elements, element;

		element = $(event.target).closest('.queditpanel');
		elements = $('.queditpanel').get();
		for (i = 0; i < elements.length; i++) {
			if ($(elements[i]).hasClass('active')) {
				this.renderInactive(elements[i]);
			}
		}
		this.renderActive(element);
	},
	
	renderActive: function(element) {
		var quedit_id = parseInt($(element).attr('id'));
		var view = new Gangnam.Views.QueditsActive({
			attr: this.attr,
			quedit: this.attr.quedits.where({id: quedit_id})[0]
		});
		this.subviews.push(view);
		$(element).children().remove();
		$(element).addClass('active');
		$(element).html(view.render().el);
	},
	
	renderInactive: function(element) {
		var quedit_id = parseInt($(element).attr('id'));
		var view = new Gangnam.Views.QueditsInactive({
			attr: this.attr,
			quedit: this.attr.quedits.where({id: quedit_id})[0]
		});	
		this.subviews.push(view);
		$(element).children().remove();
		$(element).removeClass('active');
		$(element).html(view.render().el);	
	},
	
	renderCreate: function() {
		var element = $(this.el).closest('#question');
		var view = new Gangnam.Views.QueditsCreate({
			attr: this.attr,
			question: this.question
		});
		this.subviews.push(view);
		$(element).children().remove();
		$(element).html(view.render().el);
	},
	
	onClose: function() {
		_.each(this.subviews, function(view) {
			view.remove();
			view.unbind();
			
			if (view.onClose) {
				view.onClose();
			}
		});
	}
});
