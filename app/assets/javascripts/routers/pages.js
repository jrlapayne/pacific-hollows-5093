Gangnam.Routers.Pages = Backbone.Router.extend({
	
	routes: {
		'' : 'pagesHome',
		'issues' : 'issuesIndex',
		'issue:id/basics' : 'questionsBasics',
		'issue:id/pros' : 'questionsPros',
		'issue:id/cons' : 'questionsCons',
		'question:id' : 'factsIndex',
		'factory' : 'questionsFactory',
		'profile' : 'usersProfile'
	},
	
	initialize: function(options) {
		var self = this;
		
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
		this.users = options.users;
		
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
			users: this.users
		};
		
		this.pagesHeader();
		
		setInterval(function() {
			self.updateCollections();
		}, 120000)
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
			users: this.users
		};
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
		$('#navbar').html(view.render().el);
	},
	
	pagesHome: function() {
		var view = new Gangnam.Views.PagesHome({
			attr: this.attr
		});
		$('.page').html(view.render().el);
	},
	
	issuesIndex: function() {
		var view = new Gangnam.Views.IssuesIndex({
			attr: this.attr
		});
		$('#navbar').children().remove();
		$('.page').html(view.render().el);
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
		$('.page').html(JST['pages/columns']);
		$('#right').html(view.render().el);
		this.autocomplete(issue);
	},
	
	factsIndex: function(id) {
		var view = new Gangnam.Views.FactsIndex({
			attr: this.attr,
			question: this.questions.where({id: parseInt(id)})[0]
		});
		$('#right').html(view.render().el);
	},
	
	questionsFactory: function() {
		var view = new Gangnam.Views.QuestionsFactory({
			attr: this.attr
		});
		$('.page').html(JST['pages/columns']);
		$('#right').html(view.render().el);
	},
	
	usersProfile: function() {
		
	}
});
