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
		this.user_privileges = new Gangnam.Collections.UserPrivileges(data.user_privileges);
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
			user_privileges: this.user_privileges,
			users: this.users
		});
		this.preLoad();
		Backbone.history.start();
	},
	
	preLoad: function() {
		$('<img />').attr('src', 'assets/logos/white.png');
		$('<img />').attr('src', 'assets/logos/blue.png');
		$('<img />').attr('src', 'assets/logos/black.png');
		
		$('<img />').attr('src', 'assets/slides/1.png');
		$('<img />').attr('src', 'assets/slides/2.png');
		$('<img />').attr('src', 'assets/slides/3.png');
		
		setTimeout(function() {
			$('<img />').attr('src', 'assets/people/A.png');
			$('<img />').attr('src', 'assets/people/JFK.png');
			$('<img />').attr('src', 'assets/people/MLK.png');
			$('<img />').attr('src', 'assets/people/TJ.png');
			$('<img />').attr('src', 'assets/people/WLSC.png');
			
			this.issues.each(function(i) {
				$('<img />').attr('src', 'assets/issues/' + i.get('thumbnail'));
			});
			
			$('<img />').attr('src', 'assets/misc/magnify.png');
			$('<img />').attr('src', 'assets/misc/user.png');
			
			this.achievements.each(function(e) {
				$('<img />').attr('src', 'assets/achievements/' + e.get('thumbnail'));
			});
			
			for (w = 0; w < 16; w++) {
				$('<img />').attr('src', 'assets/rage/win/' + (w + 1) + '.png');
			}
			for (f = 0; w < 23; w++) {
				$('<img />').attr('src', 'assets/rage/fail/' + (f + 1) + '.png');
			}
		}, 0);
	}
};