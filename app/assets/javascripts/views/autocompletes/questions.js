Gangnam.Views.AutocompletesQuestions = Backbone.View.extend({
	
	template: JST['autocompletes/autocomplete'],
	
	events: {
		'keydown #auto' 		: 'getChar',
		'focus #auto' 			: 'showResults',
		'blur #auto' 			: 'removeResults',
		'hover .autocom-result' : 'setHovered',
		'click .autocom-result' : 'goToResult',
		'click #add' 			: 'addQuestion'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.issue = options.issue;
		this.hovered = null;
		this.matches = null;
		this.array = [];
		
		this.attr.questions.on('auto', this.render, this);
		this.attr.questions.on('reset', this.render, this);
	},
	
	render: function() {
		$(this.el).html(this.template());
		this.getArray();
		return this;
	},
	
	getArray: function() {
		var self = this;
		if (this.issue !== null) {
			this.questions = this.attr.questions.where({issue_id: this.issue.get('id')});
		} else {
			this.questions = [];
			this.attr.questions.each(function(q) {
				if (!self.attr.facts.where({question_id: q.get('id')})[0]) {
					self.questions.push(q);
				}
			});
		}
		
		for (i = 0; i < this.questions.length; i++) {
			this.array.push({
				id: this.questions[i].get('id'),
				title: this.questions[i].get('title')
			});
		}
	},
	
	autocomplete: function(character) {
		var string, length;
		var self = this;
		
		if (character) {
			if (character !== 8) {
		        string = $('#auto').val() + String.fromCharCode(character);
			} else {
		        string = $('#auto').val().substring(0, $('#auto').val().length - 1);
			}
		} else {
			string = $('#auto').val();
		}
		
		$('#autocom').empty();
		
		if (string.length > 2) {			
			this.matches = $('#auto').autocomplete(string, this.array);
			if (this.matches.length < 10) {
				length = this.matches.length;
			} else {
				length = 10;
			}
			for (i = 0; i < length; i++) {
				this.appendResult(this.matches[i]);
			}
			setTimeout(function() {
				$('#autocom').append(JST['autocompletes/ask']({title: $('#auto').val()}));
			}, 0);
			this.hovered = $('#autocom').children().first();
			$(this.hovered).addClass('hovered');
		}
	},
	
	appendResult: function(object) {
		var view = new Gangnam.Views.PagesResult({
			title: object.title,
			question: this.attr.questions.where({id: object.id})[0]
		});
		$('#autocom').append(view.render().el);
	},
	
	setHovered: function(event) {
		$('#autocom').children().removeClass('hovered');
		if (event.type === 'mouseenter') {
			this.hovered = $(event.target);
			$(this.hovered).addClass('hovered');
		} else {
			this.hovered = null;
			if (this.matches) {
				this.hovered = $('#autocom').children().first();
				$(this.hovered).addClass('hovered');
			}
		}
	},
	
	getChar: function(event) {
		var self = this;

		switch(event.keyCode) {
			case 35: // end
			case 36: // home
			case 16: // shift
			case 17: // ctrl
			case 18: // alt
			case 37: // left
			case 39: // right
				break;
				
			case 38: //up
				event.preventDefault();
				self.hoverResult(1);
				break;
				
			case 40: //down
				event.preventDefault();
				self.hoverResult(-1);
				break;
				
			case 9: //tab
				break;
				
			case 13: //return
				event.preventDefault();
				self.selectResult();
				break;
				
			case 27: //escape
				break;
				
			default: 
				self.autocomplete(event.keyCode);
		}
	},
	
	hoverResult: function(dir) {
		if (this.hovered && this.matches) {
			if (dir === 1 && parseInt($(this.hovered).attr('id')) !== this.matches[0].id) {
				$(this.hovered).prev().addClass('hovered');
				$(this.hovered).removeClass('hovered');
				this.hovered = $(this.hovered).prev();
			}
			
			if (dir === -1 && parseInt($(this.hovered).attr('id')) !== this.matches[9].id) {
				$(this.hovered).next().addClass('hovered');
				$(this.hovered).removeClass('hovered');
				this.hovered = $(this.hovered).next();
			}
		} else {
			if (dir === -1 && this.matches) {
				this.hovered = $('#autocom').children().first();
				$(this.hovered).addClass('hovered');
			}
		}
	},
	
	selectResult: function() {
		var selected;
		
		for (i = 0; i < this.matches.length; i++) {
			if (this.matches[i].id === parseInt($(this.hovered).attr('id'))) {
				selected = this.matches[i];
				break;
			}
		}
		
		alert(this.attr.facts.where({id: selected.id})[0].get('title'));
	},
	
	removeResults: function(event) {
		var self = this;
		
		setTimeout(function() {
			self.hovered = null;
			self.matches = null;
			$('#autocom').empty();
		}, 200);
	},
	
	showResults: function() {
		this.autocomplete(null);
	},
	
	goToResult: function(event) {
		var element = $(event.target).closest('.autocom-result');
		Backbone.history.navigate('question' + $(element).attr('id'), true);
	},
	
	addQuestion: function() {
		this.removeResults();
		this.loading();
		this.attr.questions.ask(
			$('#auto').val(), 
			this.issue, 
			this.attr.users.where({id: this.attr.current_user.get('id')})[0], 
			this.attr.quedits
		);
	},
	
	loading: function() {
		var view = new Gangnam.Views.PagesLoading();
		$('#loading').html(view.render().el);
	}
});