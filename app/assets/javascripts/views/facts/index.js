Gangnam.Views.FactsIndex = Backbone.View.extend({
	
	template: JST['facts/index'],
	id: 'index',
	
	events: {
		'click #basics' : 'questionsBasics',
		'click #advanced' : 'questionsAdvanced'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.question = options.question;
		this.facts = [];
		this.subviews = [];
		
		this.attr.facts.on('add', this.render, this);
		this.attr.facts.on('reorder', this.render, this);
		this.attr.facts.on('destroy', this.render, this);
	},

	render: function() {
		var self = this;
		this.renderIssue(this.attr.issues.where({id: this.question.get('issue_id')})[0], 'basics');
		this.renderLeaderboard();
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
	
	renderIssue: function(issue, category) {
		var view = new Gangnam.Views.IssuesShow({
			attr: this.attr,
			issue: issue,
			category: category
		});
		this.subviews.push(view);
		$('#left_top').html(view.render().el);
	},
	
	renderLeaderboard: function() {
		var view = new Gangnam.Views.UsersLeaderboard({
			attr: this.attr,
			issue: this.attr.issues.where({id: this.question.get('issue_id')})[0]
		});
		$('#left_bottom').html(view.render().el);
	},
	
	questionShow: function() {
		var view = new Gangnam.Views.QuestionsShow({
			attr: this.attr,
			question: this.question
		});
		this.subviews.push(view);
		$('#question').html(view.render().el);
	},
	
	appendFact: function(fact) {
		var view = new Gangnam.Views.FactsShow({
			attr: this.attr,
			fact: fact,
			facts: this.facts
		});
		this.subviews.push(view);
		$('#facts').append(view.render().el);
		this.renderActiveFact($('#facts').find('#' + fact.get('id')));
	},
	
	renderActiveFact: function(element) {
		var view = new Gangnam.Views.FactsActive({
			attr: this.attr,
			fact: this.attr.facts.where({id: parseInt($(element).attr('id'))})[0]
		});
		this.subviews.push(view);
		$(element).html(view.render().el);
	},
	
	appendAddFact: function() {
		var view = new Gangnam.Views.FactsCreate({
			attr: this.attr,
			question: this.question
		});
		this.subviews.push(view);
		$('#create').html(view.render().el);
	},
	
	questionsBasics: function() {
		if ($('#basics').hasClass('basics-active')) {
			return;
		}
		
		Backbone.history.navigate('issue' + this.question.get('issue_id') + '/basics', true);
	},
	
	questionsAdvanced: function() {
		if ($('#advanced').hasClass('advanced-active')) {
			return;
		}
		
		Backbone.history.navigate('issue' + this.question.get('issue_id') + '/advanced', true);
	},
	
	onClose: function() {
		_.each(this.subviews, function(view) {
			view.remove();
			view.unbind();
			
			if (view.onClose) {
				view.onClose();
			}
		});

		this.attr.facts.unbind("add", this.render);
		this.attr.facts.unbind("reorder", this.render);
		this.attr.facts.unbind("destroy", this.render);
	}
});
