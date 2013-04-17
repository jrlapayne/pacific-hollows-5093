Gangnam.Views.PagesTest = Backbone.View.extend({
	
	template: JST['pages/test'],
	
	events: {
		'click #test' : 'testTrigger'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
	},
	
	render: function() {
		$(this.el).addClass('static');
		$(this.el).html(this.template());
		return this;
	},
	
	testTrigger: function() {
		this.attr.comments.create({
			content: "this is a test"
		});
	}
});