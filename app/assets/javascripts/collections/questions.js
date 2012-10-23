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
						$('loading').children().remove();
						Backbone.history.navigate('question' + question.get('id'), true);
					}
				});
			}
		});
	},
	
	resetScores: function(votes) {
		var score, ques_votes;
		this.each(function(q) {
			score = 0;
			ques_votes = votes.where({question_id: g.get('question_id'), fact_id: null, comment_id: null});
			for (i = 0; i < ques_votes.length; i++) {
				score = score + ques_votes[i].get('value');
			}
			q.set({score: score});
			q.save();
		});
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
	}
});
