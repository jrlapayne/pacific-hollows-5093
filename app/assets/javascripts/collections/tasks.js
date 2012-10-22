Gangnam.Collections.Tasks = Backbone.Collection.extend({
	
	model: Gangnam.Models.Task,
	url: 'tasks',
	
	browseTask: function(question, user, reputations) {
		if (!this.where({user_id: user.get('id'), question_id: question.get('id'), is_quiz: false})[0]) {
			this.create({
				question_id: question.get('id'),
				user_id: user.get('id'),
				is_quiz: false
			});
			reputations.addOrUpdate(user, question.get('issue_id'), 1);
			
			//check for achievements
		}
	},
	
	quizTask: function(question, answer, user, reputations) {
		if (!this.where({user_id: user.get('id'), question_id: question.get('id'), is_quiz: true})[0]) {
			this.create({
				question_id: question.get('id'),
				user_id: user.get('id'),
				is_quiz: true,
				answer_id: answer.get('id')
			});
			
			if (answer.get('is_correct')) {
				reputations.addOrUpdate(user, question.get('issue_id'), 10);
			}
			
			//check for achievements
		}
	}
});
