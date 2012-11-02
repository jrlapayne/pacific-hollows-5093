Gangnam.Views.QuestionsShow = Backbone.View.extend({
	
	template: JST['questions/show'],
	
	events: {
		'click .comments' : 'commentsIndex',
		'click #quedit' : 'queditCreate'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.question = this.attr.questions.where({id: options.question.get('id')})[0];
		this.facts = this.attr.facts.where({question_id: this.question.get('id')});
		this.comments = this.attr.comments.where({question_id: this.question.get('id'), fact_id: null});
		this.votes = this.attr.votes.where({question_id: this.question.get('id')});
		this.upvotes = 0;
		
		for (i = 0; i < this.votes.length; i++) {
			this.upvotes = this.upvotes + this.votes[i].get('value');
		}
	},
	
	render: function() {
		var self = this;
		$(this.el).attr('id', this.question.get('id'));
		$(this.el).addClass('panel question active');
		$(this.el).html(this.template({
			question: this.question,
			comments: this.comments,
			upvotes: this.upvotes
		}));
		
		setTimeout(function() {
			self.renderVotes();
			self.renderRank();
			self.renderComments();
		}, 0);
		return this;
	},
	
	renderVotes: function() {
		var view = new Gangnam.Views.VotesQuestion({
			attr: this.attr,
			question: this.question
		});
		$(this.el).find('#votes').html(view.render().el);
	},
	
	renderComments: function() {
		$(this.el).find('.comments').html(JST['comments/number']({comments: this.comments}));
	},
	
	renderRank: function() {
		var view = new Gangnam.Views.ReputationsQuestion({
			attr: this.attr,
			issue: this.attr.issues.where({id: this.question.get('issue_id')})[0],
			question: this.question
		});
		$(this.el).find('#user_info').html(view.render().el);
	},
	
	commentsIndex: function(event) {
		var element = $(event.target).closest('.comments');
		if (!$(element).hasClass('active')) {
			var view = new Gangnam.Views.CommentsIndex({
				attr: this.attr,
				question: this.question,
				fact: null
			});
			$(element).addClass('active');
			$(element).html(view.render().el);
		}
	},
	
	queditCreate: function(event) {
		var element = $(event.target).closest('.question');
		var view = new Gangnam.Views.QueditsCreate({
			attr: this.attr,
			question: this.question
		});
		$(element).html(view.render().el);
	}
});