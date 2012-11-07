Gangnam.Views.IssuesPreview = Backbone.View.extend({
	
	template: JST['issues/preview'],
	
	events: {

	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.issue = this.attr.issues.where({id: options.issue.get('id')})[0];
		this.current_user = this.attr.users.where({id: this.attr.current_user.get('id')})[0];
		this.subviews = [];
		
		this.attr.issues.on('reset', this.render, this);
		this.attr.users.on('add', this.render, this);
	},
	
	render: function() {
		var self = this;
		$(this.el).attr('id', this.issue.get('id'));
		$(this.el).addClass('panel issue preview');
		$(this.el).html(this.template({
			issue: this.issue
		}));
		setTimeout(function() {
			self.renderRank();
		}, 0);
		return this;
	},
	
	renderRank: function() {
		 /* var view = new Gangnam.Views.ReputationsIssue({
			attr: this.attr,
			issue: this.issue
		});
		this.subviews.push(view);
		$(this.el).find('#rank').html(view.render().el); */
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