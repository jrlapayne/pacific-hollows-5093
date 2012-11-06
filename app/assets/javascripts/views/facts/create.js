Gangnam.Views.FactsCreate = Backbone.View.extend({
	
	template: JST['facts/create'],
	id: 'create_fact',
	
	events: {
		'submit #new_fact' : 'createFact',
		'focus #title' : 'focusTitle',
		'focus #description' : 'focusDescription',
		'focus #source' : 'focusSource',
		'blur #title' : 'blurTitle',
		'blur #description' : 'blurDescription',
		'blur #source' : 'blurSource'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.question = options.question;
		this.posting = false;
	},
	
	render: function() {
		$(this.el).addClass('panel fact create');
		$(this.el).html(this.template());
		return this;
	},
	
	createFact: function(event) {
		event.preventDefault();
		var self = this;
		var title = $('#new_fact').find('#title').val();
		var description = $('#new_fact').find('#description').val();
		var source = $('#new_fact').find('#source').val();
		
		title = this.notDefault(title, "title");
		description = this.notDefault(description, "description");
		source = this.notDefault(source, "source");
		
		if (!this.posting) {
			this.posting = true;
			
			if (this.checkValues(title, source)) {
				this.loading();
				
				this.attr.facts.create({
					issue_id: this.question.get('issue_id'),
					question_id: this.question.get('id'),
					title: title,
					description: description,
					user_id: this.attr.current_user.get('id')
				}, {
					wait: true,
					success: function(fact, response1) {
						self.attr.sources.create({
							fact_id: fact.get('id'),
							url: source
						}, {
							success: function(source, response2) {
								$('#loading').children().remove();
								self.posting = false;
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
				
				this.attr.facts.achievement(
					this.attr.users.where({id: this.attr.current_user.get('id')})[0], 
					this.attr.achievements, 
					this.attr.user_achievements, 
					this.attr.issues.where({id: this.question.get('issue_id')})[0]
				);
			} else {
				alert("Invalid Entry");
				this.posting = false;
			}
		}
	},
	
	checkValues: function(title, source) {
		if ((title !== "" && /\S/.test(title)) && (source !== "" && /\S/.test(source))) {
			return true;
		} else {
			return false;
		}
	},
	
	notDefault: function(string, type) {
		if (type === "title") {
			if (string === "Brief Summary (15 words or less)") {
				return "";
			} else {
				return string;
			}
		}
		if (type === "description") {
			if (string === "More details about the fact...") {
				return "";
			} else {
				return string;
			}
		}
		if (type === "source") {
			if (string === "URL of the source") {
				return "";
			} else {
				return string;
			}
		}
	},
	
	loading: function() {
		var view = new Gangnam.Views.PagesLoading();
		$('#loading').html(view.render().el);
	},
	
	focusTitle: function() {
		if ($('#title').hasClass('dark-text')) {
			return;
		}
		$('#title').removeClass('light-text');
		$('#title').addClass('dark-text');
		$('#title').val('');
	},
	
	focusDescription: function() {
		if ($('#description').hasClass('dark-text')) {
			return;
		}
		$('#description').removeClass('light-text');
		$('#description').addClass('dark-text');
		$('#description').val('');
	},
	
	focusSource: function() {
		if ($('#source').hasClass('dark-text')) {
			return;
		}
		$('#source').removeClass('light-text');
		$('#source').addClass('dark-text');
		$('#source').val('');
	},
	
	blurTitle: function() {
		if ($('#title').val() !== "" && /\S/.test($('#title').val())) {
			return;
		}
		$('#title').removeClass('dark-text');
		$('#title').addClass('light-text');
		$('#title').val('Brief Summary (15 words or less)');
	},
	
	blurDescription: function() {
		if ($('#description').val() !== "" && /\S/.test($('#description').val())) {
			return;
		}
		$('#description').removeClass('dark-text');
		$('#description').addClass('light-text');
		$('#description').val('More details about the fact...');
	},
	
	blurSource: function() {
		if ($('#source').val() !== "" && /\S/.test($('#source').val())) {
			return;
		}
		$('#source').removeClass('dark-text');
		$('#source').addClass('light-text');
		$('#source').val('URL of the source');
	}
});