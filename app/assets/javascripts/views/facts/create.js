Gangnam.Views.FactsCreate = Backbone.View.extend({
	
	template: JST['facts/create'],
	id: 'create_fact',
	
	events: {
		'submit #new_fact' : 'createFact'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.question = options.question;
	},
	
	render: function() {
		$(this.el).addClass('panel fact');
		$(this.el).html(this.template());
		return this;
	},
	
	createFact: function(event) {
		event.preventDefault();
		this.loading();
		var self = this;
		this.attr.facts.create({
			issue_id: this.question.get('issue_id'),
			question_id: this.question.get('id'),
			title: $('#new_fact').find('#title').val(),
			user_id: this.attr.current_user.get('id')
		}, {
			success: function(fact, response1) {
				self.attr.sources.create({
					fact_id: fact.get('id'),
					url: $('#new_fact').find('#source').val()
				}, {
					success: function(source, response2) {
						self.attr.facts.trigger('blah');
						$('#loading').children().remove();
					}
				});
				self.attr.fedits.create({
					issue_id: fact.get('issue_id'),
					question_id: fact.get('question_id'),
					fact_id: fact.get('id'),
					title: fact.get('title'),
					urls: $('#new_fact').find('#source').val(),
					user_id: fact.get('user_id')
				}, {
					success: function(fedit, response3) {
						fact.set({edit_id: fedit.get('id')});
						fact.save();
					}
				});
			}
		});
	},
	
	loading: function() {
		var view = new Gangnam.Views.PagesLoading();
		$('#loading').html(view.render().el);
	}
});