Gangnam.Views.IssuesShow = Backbone.View.extend({

	template: JST['issues/show'],
	
	events: {
		'click #basics' : 'questionsBasics',
		'click #pros' : 'questionsPros',
		'click #cons' : 'questionsCons'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.issue = this.attr.issues.where({id: options.issue.get('id')})[0];
		this.category = options.category;
	},
	
	render: function() {
		var self = this;
		$(this.el).addClass('panel issue right-tab');
		$(this.el).html(this.template({
			issue: this.issue
		}));
		setTimeout(function() {
			self.highlightCategory();
		}, 0);
		return this;
	},
	
	questionsBasics: function() {
		this.highlightCategory();
		Backbone.history.navigate('issue' + this.issue.get('id') + '/basics', true);
	},
	
	questionsPros: function() {
		this.highlightCategory();
		Backbone.history.navigate('issue' + this.issue.get('id') + '/pros', true);
	},
	
	questionsCons: function() {
		this.highlightCategory();
		Backbone.history.navigate('issue' + this.issue.get('id') + '/cons', true);
	},
	
	highlightCategory: function() {
		$('#left_top').children().removeClass('highlight');
		
		if (this.category === 'basic') {
			$('#basics').addClass('highlight');
		}
		
		if (this.category === 'pro') {
			$('#pros').addClass('highlight');
		}
		
		if (this.category === 'con') {
			$('#cons').addClass('highlight');
		}
	}
});