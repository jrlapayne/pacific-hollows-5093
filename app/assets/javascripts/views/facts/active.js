Gangnam.Views.FactsActive = Backbone.View.extend({
	
	template: JST['facts/active'],
	
	events: {
		'click .fact-comments' : 'commentsIndex',
		'click #fedit' : 'feditsCreate'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.fact = this.attr.facts.where({id: options.fact.get('id')})[0];
		this.comments = this.attr.comments.where({fact_id: this.fact.get('id')});
		this.sources = this.attr.sources.where({fact_id: this.fact.get('id')});
	},
	
	render: function() {
		var self = this;
		$(this.el).html(this.template({
			fact: this.fact,
			comments: this.comments
		}));
		setTimeout(function() {
			self.renderVotes();
			self.renderComments();
			for (k = 0; k < self.sources.length; k++) {
				self.appendSource(self.sources[k]);
			}
		}, 0);
		return this;
	},
	
	appendSource: function(source) {
		var view = new Gangnam.Views.SourcesShow({
			attr: this.attr,
			source: source
		});
		$(this.el).find('#sources').append(view.render().el);
	},
	
	renderVotes: function() {
		var view = new Gangnam.Views.VotesFact({
			attr: this.attr,
			fact: this.fact
		});
		$(this.el).find('#votes').html(view.render().el);
	},
	
	renderComments: function() {
		$(this.el).find('.fact-comments').html(JST['comments/number']({comments: this.comments}));
	},
	
	commentsIndex: function(event) {
		var element = $(event.target).closest('.fact-comments');
		if (!$(element).hasClass('active')) {
			var view = new Gangnam.Views.CommentsIndex({
				attr: this.attr,
				question: this.attr.questions.where({id: this.fact.get('question_id')})[0],
				fact: this.fact
			});
			$(element).addClass('active');
			$(element).html(view.render().el);
		}
	},
	
	feditsCreate: function(event) {
		var element = $(event.target).closest('.fact');
		var view = new Gangnam.Views.FeditsCreate({
			attr: this.attr,
			fact: this.fact
		});
		$(element).html(view.render().el);
	}
});