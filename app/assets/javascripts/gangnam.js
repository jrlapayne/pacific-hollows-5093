window.Gangnam = {
	Models: {},
	Collections: {},
	Views: {},
	Routers: {},
	
	init: function(data) {
		this.current_user = new Gangnam.Models.User(data.current_user);
		this.issues = new Gangnam.Collections.Issues(data.issues);
		this.questions = new Gangnam.Collections.Questions(data.questions);
		this.quedits = new Gangnam.Collections.Quedits(data.quedits);
		this.answers = new Gangnam.Collections.Answers(data.answers);
		this.facts = new Gangnam.Collections.Facts(data.facts);
		this.fedits = new Gangnam.Collections.Fedits(data.fedits);
		this.sources = new Gangnam.Collections.Sources(data.sources);
		this.comments = new Gangnam.Collections.Comments(data.comments);
		this.tasks = new Gangnam.Collections.Tasks(data.tasks);
		this.votes = new Gangnam.Collections.Votes(data.votes);
		this.reputations = new Gangnam.Collections.Reputations(data.reputations);
		this.privileges = new Gangnam.Collections.Privileges(data.privileges);
		this.achievements = new Gangnam.Collections.Achievements(data.achievements);
		this.user_achievements = new Gangnam.Collections.UserAchievements(data.user_achievements);
		this.users = new Gangnam.Collections.Users();
		this.users.fetch();
		
		new Gangnam.Routers.Pages({
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
		});
		Backbone.history.start();
	}
};