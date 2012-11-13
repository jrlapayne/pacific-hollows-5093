Gangnam.Collections.Questions = Backbone.Collection.extend({
	
	model: Gangnam.Models.Question,
	url: 'questions',
	
	comparator: function(question) {
		return - question.get('score');
	},
	
	ask: function(title, issue, user, quedits) {
		var self = this;
		this.create({
			issue_id: issue.get('id'),
			title: title,
			user_id: user.get('id'),
			category: 'basic'
		}, {
			success: function(question, response1) {
				quedits.create({
					issue_id: question.get('issue_id'),
					question_id: question.get('id'),
					title: question.get('title'),
					user_id: question.get('user_id'),
					category: question.get('category') 
				}, {
					success: function(quedit, response2) {
						question.set({edit_id: quedit.get('id')});
						question.save();
						self.trigger('auto');
						$('#loading').children().remove();
						Backbone.history.navigate('question' + question.get('id'), true);
					}
				});
			}
		});
	},
	
	resetScore: function(vote) {
		var question;
		question = this.where({id: vote.get('question_id')})[0];
		
		question.set({score: question.get('score') + vote.get('value')});
		question.save();
		this.checkOrder();
	},
	
	checkOrder: function() {
		var old_array, new_array, order_changed = false;
		old_array = _.toArray(this);
		this.sort();
		new_array = _.toArray(this);
		
		for (i = 0; i < new_array.length; i++) {
			if (new_array[i] !== old_array[i]) {
				order_changed = true;
				break;
			}
		}
		
		if (order_changed) {
			this.trigger('reorder');
		}
	},
	
	achievement: function(user, achievements, user_achievements, issue) {
		user_achievements.addOrUpdate(user, achievements.where({id: 4})[0], issue.get('id'));
	}
});
