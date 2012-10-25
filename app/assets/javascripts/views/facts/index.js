Gangnam.Views.FactsIndex = Backbone.View.extend({
	
	template: JST['facts/index'],
	id: 'index',
	
	events: {
		
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.question = options.question;
		this.facts = [];
		
		this.attr.facts.on('add', this.render, this);
	},

	render: function() {
		var self = this;
		this.facts = this.attr.facts.where({question_id: this.question.get('id')});
		$(this.el).html(this.template({
			facts: this.facts
		}));
		setTimeout(function() {
			self.questionShow();
			for (op = 0; op < self.facts.length; op++) {
				self.appendFact(self.facts[op]);
			}
			self.appendAddFact();
		}, 0);
		return this;
	},
	
	questionShow: function() {
		var view = new Gangnam.Views.QuestionsShow({
			attr: this.attr,
			question: this.question
		});
		$('#question').html(view.render().el);
	},
	
	appendFact: function(fact) {
		var view = new Gangnam.Views.FactsShow({
			attr: this.attr,
			fact: fact,
			facts: this.facts
		});
		$('#facts').append(view.render().el);
		this.renderActiveFact($('#facts').find('#' + fact.get('id')));
	},
	
	renderActiveFact: function(element) {
		var view = new Gangnam.Views.FactsActive({
			attr: this.attr,
			fact: this.attr.facts.where({id: parseInt($(element).attr('id'))})[0]
		});
		$(element).html(view.render().el);
	},
	
	appendAddFact: function() {
		var view = new Gangnam.Views.FactsCreate({
			attr: this.attr,
			question: this.question
		});
		$('#create').html(view.render().el);
	},
	
	onClose: function() {
		this.attr.facts.unbind("add", this.render);
	}
});
