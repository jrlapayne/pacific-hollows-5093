Gangnam.Views.IssuesIndex = Backbone.View.extend({
	
	template: JST['issues/index'],
	
	events: {
		'click .issue' : 'issueShow',
		'click #quiz' : 'issueQuiz'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
	},
	
	render: function() {
		var self = this;
		
		$(this.el).addClass('static');
		$(this.el).html(this.template({
			
		}));
		setTimeout(function() {
			self.attr.issues.each(function(i) {
				self.appendIssue(i);
			});
		}, 0);
		return this;
	},
	
	appendIssue: function(issue) {
		var view = new Gangnam.Views.IssuesPreview({
			attr: this.attr,
			issue: issue
		});
		$(this.el).append(view.render().el);
	},
	
	getLoc: function(element) {
		var top = $(element).position().top;
		var left = $(element).position().left;
		var elements = $('.issue').get();
		
		$(element).css('position', 'absolute');
		$(element).css('top', top + 'px');
		$(element).css('left', left + 'px');
		
		for (i = 0; i < elements.length; i++) {
			if ($(elements[i]).attr('id') !== $(element).attr('id')) {
				$(elements[i]).remove();
			}
		}
		
		$(element).animate({
			top: '0',
			left: '0',
			margin: '0 0 0 0.625em'
		}, 500);
	},
	
	issueShow: function(event) {
		var element = $(event.target).closest('.issue');
		if ($(event.target).hasClass('quiz') || $(event.target).attr('id') === 'quiz') {
			return;
		}
		
		this.getLoc(element);
		
		setTimeout(function() {
			Backbone.history.navigate('issue' + $(element).attr('id'), true);	
		}, 500);
	},
	
	issueQuiz: function(event) {
		var element = $(event.target).closest('.issue');
		
		this.getLoc(element);
		
		setTimeout(function() {
			Backbone.history.navigate('quiz' + $(element).attr('id'), true);
		}, 500);
	}
});
