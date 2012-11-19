Gangnam.Views.ReputationsComment = Backbone.View.extend({
	
	template: JST['reputations/comment'],
	
	events: {
		'click .name' : 'userShow'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.comment = options.comment;
		this.issue = this.attr.issues.where({id: this.attr.questions.where({id: this.comment.get('question_id')})[0].get('issue_id')})[0];
		
		this.attr.users.on('reset', this.render, this);
		this.attr.users.on('add', this.render, this);
	},
	
	render: function() {
		this.user = this.attr.users.where({id: this.comment.get('user_id')})[0];
		$(this.el).html(this.template({
			rank: this.attr.reputations.getIssueRank(this.user, this.issue, this.attr.reputations),
			user: this.user,
			date: this.getFormattedDate()
		}));
		return this;
	},
	
	getFormattedDate: function() {
		var month;
		var time = this.comment.get('created_at').split('T')[0].split('-');
		
		switch (parseInt(time[1])) {
			case 1: 
				month = "Jan"
				break;
			case 2: 
				month = "Feb"
				break;
				
			case 3: 
				month = "Mar"
				break;
				
			case 4: 
				month = "Apr"
				break;
				
			case 5: 
				month = "May"
				break;
				
			case 6: 
				month = "Jun"
				break;
				
			case 7: 
				month = "Jul"
				break;

			case 8: 
				month = "Aug"
				break;

			case 9: 
				month = "Sep"
				break;

			case 10: 
				month = "Oct"
				break;
			
			case 11: 
				month = "Nov"
				break;

			case 12: 
				month = "Dec"
				break;
		}
		
		return {day: time[2], month: month, year: time[0]};
	},
	
	userShow: function(event) {
		var element = $(event.target).closest('.name');
		if ($(element).attr('id')) {
			Backbone.history.navigate('users' + parseInt($(element).attr('id')), true);		
		}	
	},
	
	onClose: function() {
		this.attr.users.unbind('reset', this.render);
		this.attr.users.unbind('add', this.render);
	}	
});