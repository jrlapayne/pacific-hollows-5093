Gangnam.Views.FeditsCreate = Backbone.View.extend({
	
	template: JST['fedits/create'],
	
	events: {
		'click #cancel' : 'renderFact',
		'submit #fact_edit' : 'createFedit',
		'click #history' : 'feditsIndex',
		'click #delete' : 'deleteFact'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.fact = this.attr.facts.where({id: options.fact.get('id')})[0];
		this.sources = this.attr.sources.where({fact_id: this.fact.get('id')});
	},
	
	render: function() {
		$(this.el).html(this.template({
			fact: this.fact,
			sources: this.sources
		}));
		return this;
	},
	
	renderFact: function() {
		var element = $('#facts').children('#' + this.fact.get('id'));
		var view = new Gangnam.Views.FactsActive({
			attr: this.attr,
			fact: this.fact
		});
		$(element).html(view.render().el);
	},
	
	createFedit: function(event) {
		event.preventDefault();
		var self = this;
		var urls = this.getUrls($('.editsource').get());
		
		this.attr.fedits.create({
			issue_id: this.fact.get('issue_id'),
			question_id: this.fact.get('question_id'),
			fact_id: this.fact.get('id'),
			title: $('#title').val(),
			description: $('#description').val(),
			user_id: this.attr.current_user.get('id'),
			urls: urls
		}, { 
			success: function(model, response) {
				self.fact.updateFromFedit(model);
				self.renderFact();
			}
		});
		
		this.attr.fedits.achievement(
			this.attr.users.where({id: this.attr.current_user.get('id')})[0],
			this.attr.achievements,
			this.attr.user_achievements,
			this.attr.issues.where({id: this.fact.get('issue_id')})[0]
		);
	},
	
	getUrls: function(sources) {
		var urls = "", source;
		
		for (i = 0; i < sources.length; i++) {
			if ($(sources[i]).val() !== "" && /\S/.test($(sources[i]).val())) {
				if (this.attr.sources.where({id: parseInt($(sources[i]).attr('id'))})[0]) {
					source = this.attr.sources.where({id: parseInt($(sources[i]).attr('id'))})[0];
					source.set({url: $(sources[i]).val()});
					source.save();
				} else {
					this.attr.sources.create({fact_id: this.fact.get('id'), url: $(sources[i]).val()});
				}
				if (i === 0 || urls === "") {
					urls = $(sources[i]).val();
				} else {
					urls = " " + $(sources[i]).val();
				}	
			} else {
				if (this.attr.sources.where({id: parseInt($(sources[i]).attr('id'))})[0]) {
					source = this.attr.sources.where({id: parseInt($(sources[i]).attr('id'))})[0];
					source.destroy();
				}
			}
		}
		
		return urls;
	},
	
	feditsIndex: function() {
		var element = $(this.el).closest('.fact');
		var view = new Gangnam.Views.FeditsIndex({
			attr: this.attr,
			fact: this.fact
		});
		$(element).children().remove();
		$(element).html(view.render().el);
	},
	
	deleteFact: function() {
		if (confirm('Are you sure?')) {
			this.loading();
			this.fact.destroy({
				success: function(model, response) {
					$('#loading').children().remove();
				},
				error: function(model, response) {
					$('#loading').children().remove();
				}
			});
		}
	},
	
	loading: function() {
		var view = new Gangnam.Views.PagesLoading();
		$('#loading').html(view.render().el);
	}
});