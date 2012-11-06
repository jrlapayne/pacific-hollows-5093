Gangnam.Views.VotesFact = Backbone.View.extend({
	
	template: JST['votes/fact'],
	
	events: {
		'click #upvote' : 'upVote',
		'click #downvote' : 'downVote'		
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.fact = this.attr.facts.where({id: options.fact.get('id')})[0];
		this.user = this.attr.users.where({id: this.attr.current_user.get('id')})[0];
		
		this.attr.votes.on('change', this.render, this);
		this.attr.votes.on('add', this.render, this);
	},
	
	render: function() {
		$(this.el).html(this.template({
			score: this.getScore()
		}));
		return this;
	},
	
	getScore: function() {
		var votes = this.attr.votes.where({question_id: this.fact.get('question_id'), fact_id: this.fact.get('id'), comment_id: null});
		var sum = 0;
		
		for (i = 0; i < votes.length; i++) {
			sum = sum + votes[i].get('value');
		}
		
		return sum;
	},
	
	upVote: function(event) {
		var vote;
		var ids = {issue: this.fact.get('issue_id'), question: this.fact.get('question_id'), fact: this.fact.get('id'), comment: null};
		
		if (this.user.canVote()) {
			vote = this.attr.votes.addOrUpdate(this.user, ids, 1, this.attr.achievements, this.attr.user_achievements);
			this.attr.facts.resetScore(vote);
		}
	},
	
	downVote: function(event) {
		var vote;
		var ids = {issue: this.fact.get('issue_id'), question: this.fact.get('question_id'), fact: this.fact.get('id'), comment: null};
		
		if (this.user.canVote()) {
			vote = this.attr.votes.addOrUpdate(this.user, ids, -1, this.attr.achievements, this.attr.user_achievements);
			this.attr.facts.resetScore(vote);
		}
	},
	
	onClose: function() {
		this.attr.votes.unbind("add", this.render);
		this.attr.votes.unbind("change", this.render);
	}
});