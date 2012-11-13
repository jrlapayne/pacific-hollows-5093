Gangnam.Views.FactsActive = Backbone.View.extend({
	
	template: JST['facts/active'],
	
	events: {
		'click .fact-comments' : 'commentsIndex',
		'click #fedit' : 'feditsCreate',
		'click #fact_share' : 'factShare'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.fact = this.attr.facts.where({id: options.fact.get('id')})[0];
		this.comments = this.attr.comments.where({fact_id: this.fact.get('id')});
		this.sources = this.attr.sources.where({fact_id: this.fact.get('id')});
		this.user = this.attr.users.where({id: this.attr.current_user.get('id')})[0];
		this.subviews = [];
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
			self.renderRank();
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
		this.subviews.push(view);
		$(this.el).find('#sources').append(view.render().el);
	},
	
	renderVotes: function() {
		var view = new Gangnam.Views.VotesFact({
			attr: this.attr,
			fact: this.fact
		});
		this.subviews.push(view);
		$(this.el).find('#votes').html(view.render().el);
	},
	
	renderComments: function() {
		$(this.el).find('.comments.count').html(JST['comments/number']({comments: this.comments}));
	},
	
	renderRank: function() {
		var view = new Gangnam.Views.ReputationsFact({
			attr: this.attr,
			issue: this.attr.issues.where({id: this.fact.get('issue_id')})[0],
			fact: this.fact
		});
		this.subviews.push(view);
		$(this.el).find('#user_info').html(view.render().el);
	},
	
	commentsIndex: function(event) {
		if (this.user.userConditions(this.attr.user_privileges, this.attr.privileges.where({id: 3})[0])) {
			var element = $(event.target).closest('.fact-comments');
			if (!$(element).hasClass('active')) {
				var view = new Gangnam.Views.CommentsIndex({
					attr: this.attr,
					question: this.attr.questions.where({id: this.fact.get('question_id')})[0],
					fact: this.fact
				});
				this.subviews.push(view);
				$(element).addClass('active');
				$(element).html(view.render().el);
			}
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
	
	feditsCreate: function(event) {
		if (this.user.userConditions(this.attr.user_privileges, this.attr.privileges.where({id: 4})[0])) {
			var element = $(event.target).closest('.fact');
			var view = new Gangnam.Views.FeditsCreate({
				attr: this.attr,
				fact: this.fact
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
	
	factShare: function() {
		if (this.user.signedInUser()) {
			if (this.user.get('provider') === 'facebook') {
				var obj = { 
					method: 'feed', 
					link: 'http://www.fusegap.org/#question' + this.fact.get('question_id'), 
					name: 'fuseGap', 
					to: this.user.get('uid'), 
					description: "fuseGap: Informing Society"
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