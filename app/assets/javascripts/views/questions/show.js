Gangnam.Views.QuestionsShow = Backbone.View.extend({
	
	template: JST['questions/show'],
	
	events: {
		'click .comments' : 'commentsIndex',
		'click #quedit' : 'queditCreate',
		'click #question_share' : 'questionShare'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.question = this.attr.questions.where({id: options.question.get('id')})[0];
		this.facts = this.attr.facts.where({question_id: this.question.get('id')});
		this.comments = this.attr.comments.where({question_id: this.question.get('id'), fact_id: null});
		this.votes = this.attr.votes.where({question_id: this.question.get('id')});
		this.user = this.attr.users.where({id: this.attr.current_user.get('id')})[0];
		this.upvotes = 0;
		this.subviews = [];
		
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
		this.subviews.push(view);
		$(this.el).find('#votes').html(view.render().el);
	},
	
	renderComments: function() {
		$(this.el).find('.comments.count').html(JST['comments/number']({comments: this.comments}));
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
	
	commentsIndex: function(event) {
		if (this.user.userConditions(this.attr.user_privileges, this.attr.privileges.where({id: 3})[0])) {
			var element = $(event.target).closest('.question');
			var view = new Gangnam.Views.CommentsIndex({
				attr: this.attr,
				question: this.question,
				fact: null
			});
			this.subviews.push(view);
			$(element).addClass('active');
			$(element).html(view.render().el);
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
					privilege: this.attr.privileges.where({id: 3})[0]
				});
				$('.popup').html(view.render().el);
			}
		}
	},
	
	queditCreate: function(event) {
		if (this.user.userConditions(this.attr.user_privileges, this.attr.privileges.where({id: 4})[0])) {
			var element = $(event.target).closest('.question');
			var view = new Gangnam.Views.QueditsCreate({
				attr: this.attr,
				question: this.question
			});
			this.subviews.push(view);
			$(element).html(view.render().el);
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
					privilege: this.attr.privileges.where({id: 4})[0]
				});
				$('.popup').html(view.render().el);
			}
		}
	},
	
	questionShare: function(event) {
		if (this.user.signedInUser()) {
			if (this.user.get('provider') === 'facebook') {
				var obj = { 
					method: 'feed', 
					link: 'http://www.fusegap.org/#question' + this.question.get('id'), 
					name: 'fuseGap', 
					to: this.user.get('uid'), 
					description: this.question.get('title')
				};
				function callback(response) 
				{
					
		        }
				FB.ui(obj, callback);
			} else {
				alert('This feature is currently only available for fusers signed in with facebook');
			}
		} else {
			var view = new Gangnam.Views.PopupsSignin({
				attr: this.attr,
				user: this.user
			});
			$('.popup').html(view.render().el);
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