Gangnam.Views.PagesAutocomplete = Backbone.View.extend({
	
	template: JST['pages/autocomplete'],
	
	events: {
		'click .autocom-result' : 'goToResult',
		'keydown #auto' : 'getChar',
		'hover .autocom-result' : 'setHovered',
		'focus #auto' : 'showResults',
		'blur #auto' : 'removeResults',
		'click #add' : 'addFact'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.questions = this.attr.questions.where({issue_id: 4});
		this.hovered = null;
		this.matches = null;
	},
	
	render: function() {
		$(this.el).html(this.template({
			
		}));
		var self = this;
		return this;
	},
	
	stuff: function(character) {
		var questions = [];
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
			for (i = 0; i < this.questions.length; i++) {
				questions.push({
					id: this.questions[i].get('id'),
					title: this.questions[i].get('title')
				});
			}
			
			this.matches = $('#auto').autocomplete(string, questions);
			if (this.matches.length < 10) {
				length = this.matches.length;
			} else {
				length = 10;
			}
			for (i = 0; i < length; i++) {
				this.appendResult(this.matches[i]);
			}
			setTimeout(function() {
				$('#autocom').append($('#auto').val() + " <button id = 'add'>Add</button>");
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
				self.stuff(event.keyCode);
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
		this.stuff(null);
	},
	
	goToResult: function(event) {
		var element = $(event.target).closest('.autocom-result');
		alert(this.attr.facts.where({id: parseInt($(element).attr('id'))})[0].get('title'));
	},
	
	addFact: function() {
		alert('are you sure you want to add the fact: ' + '"' + $('#auto').val() + '"');
	}
});