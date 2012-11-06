Gangnam.Routers.Pages = Backbone.Router.extend({
	
	routes: {
		'' : 'pagesHome',
		'issues' : 'issuesIndex',
		'issue:id' : 'issuesCategories',
		'issue:id/basics' : 'questionsBasics',
		'issue:id/pros' : 'questionsPros',
		'issue:id/cons' : 'questionsCons',
		'question:id' : 'factsIndex',
		'factory' : 'questionsFactory',
		'profile' : 'currentUserProfile',
		'about' : 'pagesAbout',
		'quiz:id' : 'quizzesIndex',
		'users:id' : 'usersProfile'
	},
	
	initialize: function(options) {
		var self = this;
		
		this.current_view = null;
		this.current_user = options.current_user;
		this.issues = options.issues;
		this.questions = options.questions;
		this.quedits = options.quedits;
		this.answers = options.answers;
		this.facts = options.facts;
		this.fedits = options.fedits;
		this.sources = options.sources;
		this.comments = options.comments;
		this.tasks = options.tasks;
		this.votes = options.votes;
		this.reputations = options.reputations;
		this.privileges = options.privileges;
		this.achievements = options.achievements;
		this.user_achievements = options.user_achievements;
		this.users = options.users;
		window.scroll_loc = 0;
		window.factory = this.getFactory();

		this.attr = {
			current_user: this.current_user,
			issues: this.issues,
			questions: this.questions,
			quedits: this.quedits,
			answers: this.answers,
			facts: this.facts,
			fedits: this.fedits,
			sources: this.sources,
			comments: this.comments,
			tasks: this.tasks,
			votes: this.votes,
			reputations: this.reputations,
			privileges: this.privileges,
			achievements: this.achievements,
			user_achievements: this.user_achievements,
			users: this.users,
			scroll_loc: this.scroll_loc,
			factory: this.factory
		};
		
		this.pagesHeader();
		
		/* setInterval(function() {
			self.updateCollections();
		}, 120000); */
	},
	
	updateCollections: function() {
		this.issues.fetch();
		this.questions.fetch();
		this.quedits.fetch();
		this.answers.fetch();
		this.facts.fetch();
		this.fedits.fetch();
		this.sources.fetch();
		this.comments.fetch();
		this.tasks.fetch();
		this.votes.fetch();
		this.reputations.fetch();
		this.privileges.fetch();
		this.achievements.fetch();
		this.user_achievements.fetch();
		this.users.fetch();
		
		this.attr = {
			current_user: this.current_user,
			issues: this.issues,
			questions: this.questions,
			quedits: this.quedits,
			answers: this.answers,
			facts: this.facts,
			fedits: this.fedits,
			sources: this.sources,
			comments: this.comments,
			tasks: this.tasks,
			votes: this.votes,
			reputations: this.reputations,
			privileges: this.privileges,
			achievements: this.achievements,
			user_achievements: this.user_achievements,
			users: this.users
		};
	},
	
	setCurrentView: function(view) {
		if (this.current_view) {
			this.current_view.remove();
			this.current_view.unbind();
			
			if (this.current_view.onClose) {
				this.current_view.onClose();
			}
		}
		
		this.current_view = view;
	},
	
	getFactory: function() {
		var array = [];
		
		this.issues.each(function(i) {
			array.push(i.get('id'));
		});
		
		return array;
	},
	
	signedInUser: function(user) {
		return !user.get('is_temp_user');
	},
	
	pagesHeader: function() {
		var view = new Gangnam.Views.PagesHeader({
			attr: this.attr
		});
		$('#header').html(view.render().el);
	},
	
	autocomplete: function(issue) {
		var view = new Gangnam.Views.AutocompletesQuestions({
			attr: this.attr,
			issue: issue
		});
		$('#search_add').html(view.render().el);
	},
	
	pagesHome: function() {
		var view = new Gangnam.Views.PagesHome({
			attr: this.attr
		});
		this.setCurrentView(view);
		$('.page').html(view.render().el);
	},
	
	issuesIndex: function() {
		var view = new Gangnam.Views.IssuesIndex({
			attr: this.attr
		});
		this.renderNavbar();
		this.setCurrentView(view);
		$('.page').html(view.render().el);
	},
	
	renderNavbar: function() {
		var view = new Gangnam.Views.PagesNavbar();
		$('#navbar').html(view.render().el);
	},
	
	questionsBasics: function(id) {
		this.questionsIndex(this.issues.where({id: parseInt(id)})[0], 'basic');
	},
	
	questionsPros: function(id) {
		this.questionsIndex(this.issues.where({id: parseInt(id)})[0], 'pro');
	},
	
	questionsCons: function(id) {
		this.questionsIndex(this.issues.where({id: parseInt(id)})[0], 'con');
	},
	
	questionsIndex: function(issue, category) {
		var view = new Gangnam.Views.QuestionsIndex({
			attr: this.attr,
			issue: issue,
			category: category
		});
		this.setCurrentView(view);
		$('#right').html(view.render().el);
		this.autocomplete(issue);
	},
	
	issuesCategories: function(id) {
		var view = new Gangnam.Views.IssuesCategories({
			attr: this.attr,
			issue: this.issues.where({id: parseInt(id)})[0]
		});
		$('.page').html(JST['pages/columns']);
		$('#left_bottom').html(view.render().el);
		Backbone.history.navigate('issue' + id + '/basics', true);
	},
	
	factsIndex: function(id) {
		var view = new Gangnam.Views.FactsIndex({
			attr: this.attr,
			question: this.questions.where({id: parseInt(id)})[0]
		});
		this.setCurrentView(view);
		$('#right').html(view.render().el);
	},
	
	questionsFactory: function() {
		var view = new Gangnam.Views.QuestionsFactory({
			attr: this.attr
		});
		$('.page').html(JST['pages/columns']);
		this.setCurrentView(view);
		this.issuesFactory();
		$('#right').html(view.render().el);
	},
	
	pagesAbout: function() {
		var view = new Gangnam.Views.PagesAbout({
			attr: this.attr
		});
		this.setCurrentView(view);
		$('.page').html(view.render().el);
	},
	
	currentUserProfile: function() {
		var view = new Gangnam.Views.UsersProfile({
			attr: this.attr,
			user: this.users.where({id: this.current_user.get('id')})[0]
		});
		$('.page').html(JST['pages/columns']);
		this.setCurrentView(view);
		$('#right').html(view.render().el);
	},
	
	usersProfile: function(id) {
		var view = new Gangnam.Views.UsersProfile({
			attr: this.attr,
			user: this.users.where({id: parseInt(id)})[0]
		});
		$('.page').html(JST['pages/columns']);
		this.setCurrentView(view);
		$('#right').html(view.render().el);
	},
	
	quizzesIndex: function(id) {
		var view = new Gangnam.Views.QuizzesIndex({
			attr: this.attr,
			issue: this.issues.where({id: parseInt(id)})[0]
		});
		this.setCurrentView(view);
		$('.page').html(JST['pages/columns']);
		$('#right').html(view.render().el);
	},
	
	issuesFactory: function() {
		var view = new Gangnam.Views.IssuesFactory({
			attr: this.attr
		});
		$('#left_top').html(view.render().el);
	}
});
