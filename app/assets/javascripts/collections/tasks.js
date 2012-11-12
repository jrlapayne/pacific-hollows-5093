Gangnam.Collections.Tasks = Backbone.Collection.extend({
	
	model: Gangnam.Models.Task,
	url: 'tasks',
	
	browseTask: function(question, user, reputations, achievements, user_achievements) {
		if (!this.where({user_id: user.get('id'), question_id: question.get('id'), is_quiz: false})[0]) {
			this.create({
				question_id: question.get('id'),
				user_id: user.get('id'),
				is_quiz: false
			});
			reputations.addOrUpdate(user, question.get('issue_id'), 1);
			user_achievements.addOrUpdate(user, achievements.where({id: 1})[0], question.get('issue_id'));
		}
	},
	
	quizTask: function(question, answer, user, reputations, achievements, user_achievements) {
		if (!this.where({user_id: user.get('id'), question_id: question.get('id'), is_quiz: true})[0]) {
			this.create({
				question_id: question.get('id'),
				user_id: user.get('id'),
				is_quiz: true,
				answer_id: answer.get('id')
			});
			
			if (answer.get('is_correct')) {
				reputations.addOrUpdate(user, question.get('issue_id'), 10);
				user_achievements.addOrUpdate(user, achievements.where({id: 2})[0], question.get('issue_id'));
			}
		}
	}
});
