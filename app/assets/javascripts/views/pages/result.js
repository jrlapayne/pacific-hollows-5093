Gangnam.Views.PagesResult = Backbone.View.extend({

	template: JST['pages/result'],
	
	events: {
		
	},
	
	initialize: function(options) {
		this.title = options.title;
		this.question = options.question;
	},
	
	render: function() {
		$(this.el).addClass('autocom-result');
		$(this.el).attr('id', this.question.get('id'));
		$(this.el).html(this.template({
			title: this.title,
			question: this.question
		}));
		return this;
	}
});