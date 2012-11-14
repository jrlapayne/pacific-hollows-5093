Gangnam.Views.ReputationsGlobal = Backbone.View.extend({
	
	template: JST['reputations/global'],
	
	initialize: function(options) {
		this.attr = options.attr;
		this.user = this.attr.users.where({id: options.user.get('id')})[0];
		
		this.attr.users.on('reset', this.render, this);
		this.attr.users.on('add', this.render, this);
	},
	
	render: function() {
		$(this.el).html(this.template({
			rank: this.attr.users.getRank(this.user),
			user: this.user,
			privilege: this.getNextPrivilege(),
			width: this.getWidth()
		}));
		return this;
	},
	
	getNextPrivilege: function() {
		var user_privileges = this.attr.user_privileges.where({user_id: this.user.get('id')});
		var privileges = _.toArray(this.attr.privileges);
		privileges.sort(function(a, b) {
			return a.get('rep') - b.get('rep');
		});
		
		switch (user_privileges.length) {
			case 0:
				return privileges[0];
				break;
			case 1:
				return privileges[1];
				break;
			case 2:
				return privileges[2];
				break;
			case 3:
				return privileges[3];
				break;
			default:
				return null;
				break;
		}
	},
	
	getWidth: function() {
		var next_privilege = this.getNextPrivilege();
		var privileges = _.toArray(this.attr.privileges);
		privileges.sort(function(a, b) {
			return a.get('rep') - b.get('rep');
		});
		var prev_rep = null, next_rep = next_privilege.get('rep'), user_rep = this.user.get('rep');
		
		for (i = 0; i < privileges.length; i++) {
			if (privileges[i] === next_privilege && next_privilege !== null) {
				if (i === 0) {
					prev_rep = 0;
				} else {
					prev_rep = privileges[i - 1].get('rep');
				}
			}
		}
		
		if (prev_rep === null) {
			return 100;
		} else {
			return ((user_rep - prev_rep) / (next_rep - prev_rep)) * 100;
		}
	},
	
	onClose: function() {
		this.attr.users.unbind('reset', this.render);
		this.attr.users.unbind('add', this.render);
	}
});