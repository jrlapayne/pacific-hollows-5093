Gangnam.Views.QuestionsPreview = Backbone.View.extend({
	
	template: JST['questions/preview'],
	
	events: {
		'click #upvote' : 'upvote',
		'click #downvote' : 'downvote'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.question = this.attr.questions.where({id: options.question.get('id')})[0];
		this.questions = options.questions;
		this.user = this.attr.users.where({id: this.attr.current_user.get('id')})[0];
		this.subviews = [];
	},
	
	render: function() {
		var self = this;
		$(this.el).addClass('panel question preview');
		$(this.el).attr('id', this.question.get('id'));
		if (this.question.get('id') === this.questions[0].get('id')) {
			$(this.el).addClass('top');
		}
		if (this.question.get('id') === this.questions[this.questions.length - 1].get('id')) {
			$(this.el).addClass('bottom');
		}
		$(this.el).html(this.template({
			question: this.question,
			facts: this.getFacts(),
			comments: this.getComments()
		}));
		setTimeout(function() {
			self.renderRank();
			self.renderScore();
		}, 0);
		return this;
	},
	
	renderRank: function() {
		var view = new Gangnam.Views.ReputationsQuestion({
			attr: this.attr,
			issue: this.attr.issues.where({id: this.question.get('issue_id')})[0],
			question: this.question
		});
		this.subviews.push(view);
		$(this.el).find('#user_info').html(view.render().el);
	},
	
	renderScore: function() {
		var view = new Gangnam.Views.QuestionsScore({
			attr: this.attr,
			question: this.question
		});
		this.subviews.push(view);
		$(this.el).find('#score').html(view.render().el);
	},
	
	getFacts: function() {
		return this.attr.facts.where({question_id: this.question.get('id')});
	},
	
	getComments: function() {
		return this.attr.comments.where({question_id: this.question.get('id')});
	},
	
	upvote: function() {
		var vote;
		var ids = {issue: this.question.get('issue_id'), question: this.question.get('id'), fact: null, comment: null};
		
		if (this.user.userConditions(this.attr.user_privileges, this.attr.privileges.where({id: 1})[0])) {
			vote = this.attr.votes.addOrUpdate(this.user, ids, 1, this.attr.achievements, this.attr.user_achievements);
			this.question.updateScore(this.attr.votes);
		} else {
			if (!this.user.signedInUser()) {
				var view = new Gangnam.Views.PopupsSignin({
					attr: this.attr,
					user: this.user
				});
				$('.popup').html(view.render().el);
			} else {
				var view = new Gangnam.Views.PopupsNeedPrivilege({
					attr: this.attr,
					user: this.user,
					privilege: this.attr.privileges.where({id: 1})[0]
				});
				$('.popup').html(view.render().el);
			}	
		}
	},
	
	downvote: function() {
		var vote;
		var ids = {issue: this.question.get('issue_id'), question: this.question.get('id'), fact: null, comment: null};
		
		if (this.user.userConditions(this.attr.user_privileges, this.attr.privileges.where({id: 2})[0])) {
			vote = this.attr.votes.addOrUpdate(this.user, ids, -1, this.attr.achievements, this.attr.user_achievements);
			this.question.updateScore(this.attr.votes);
		} else {
			if (this.user.signedInUser()) {
				var view = new Gangnam.Views.PopupsSignin({
					attr: this.attr,
					user: this.user
				});
				$('.popup').html(view.render().el);
			} else {
				var view = new Gangnam.Views.PopupsNeedPrivilege({
					attr: this.attr,
					user: this.user,
					privilege: this.attr.privileges.where({id: 2})[0]
				});
				$('.popup').html(view.render().el);
			}
		}
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