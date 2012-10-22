Gangnam.Views.QueditsRevert = Backbone.View.extend({
	
	template: JST['quedits/revert'],
	
	initialize: function(options) {
		this.attr = options.attr;
		this.quedit = this.attr.quedits.where({id: options.quedit.get('id')})[0];
		this.question = this.attr.questions.where({id: options.quedit.get('question_id')})[0];
		this.is_active = options.is_active;
	},
	
	render: function() {
		$(this.el).html(this.template({
			question: this.question,
			quedit: this.quedit,
			is_active: this.is_active
		}));
		return this;
	}
});