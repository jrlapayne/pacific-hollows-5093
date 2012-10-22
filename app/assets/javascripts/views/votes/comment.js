Gangnam.Views.VotesComment = Backbone.View.extend({
	
	template: JST['votes/comment'],
	
	events: {
		'click #comment_up' : 'upVote',
		'click #comment_down' : 'downVote'	
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.comment = this.attr.comments.where({id: options.comment.get('id')})[0];
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
		var votes = this.attr.votes.where({question_id: this.comment.get('question_id'), fact_id: this.comment.get('fact_id'), comment_id: this.comment.get('id')});
		var sum = 0;
		
		for (i = 0; i < votes.length; i++) {
			sum = sum + votes[i].get('value');
		}
		
		return sum;
	},
	
	upVote: function(event) {
		if (this.user.canVote()) {
			this.attr.votes.addOrUpdate(this.user, this.comment.get('question_id'), this.comment.get('fact_id'), this.comment.get('id'), 1);
			this.attr.comments.resetScores(this.attr.votes);
		}
	},
	
	downVote: function(event) {
		if (this.user.canVote()) {
			this.attr.votes.addOrUpdate(this.user, this.comment.get('question_id'), this.comment.get('fact_id'), this.comment.get('id'), -1);
			this.attr.comments.resetScores(this.attr.votes);
		}
	}
});