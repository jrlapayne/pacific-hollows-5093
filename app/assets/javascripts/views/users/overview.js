Gangnam.Views.UsersOverview = Backbone.View.extend({
	
	template: JST['users/overview'],
	
	events: {
		
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.user = this.attr.users.where({id: options.user.get('id')})[0];
		this.subviews = [];
	},
	
	render: function() {
		var self = this;
		$('#left_bottom').remove();
		$(this.el).html(this.template());
		setTimeout(function() {
			self.renderRank();
			self.renderAchievements();
		}, 0);
		return this;
	},
	
	renderRank: function() {
		var view = new Gangnam.Views.ReputationsGlobal({
			attr: this.attr,
			user: this.user
		});
		this.subviews.push(view);
		$(this.el).find('#user_info').html(view.render().el);
	},
	
	renderAchievements: function() {
		var view = new Gangnam.Views.AchievementsIndex({
			attr: this.attr,
			user: this.user,
			issue: null
		});
		this.subviews.push(view);
		$(this.el).find('#achievements').html(view.render().el);
	},
	
	onClose: function() {
		_.each(this.subviews, function(view) {
			view.remove();
			view.unbind();
			
			if (view.onClose) {
				view.onClose();
			}
		});
	}
});