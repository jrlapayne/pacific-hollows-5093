Gangnam.Collections.UserPrivileges = Backbone.Collection.extend({
	
	model: Gangnam.Models.UserPrivilege,
	url: 'user_privileges',
	
	checkForNew: function(user, privileges) {
		var user_privileges = this.where({user_id: user.get('id')});
		var array = _.toArray(privileges);
		array.sort(function(a, b) {
			return a.get('rep') - b.get('rep');
		});
		
		switch (user_privileges.length) {
			case 0:
				if (user.get('rep') >= array[0].get('rep')) {
					this.create({
						user_id: user.get('id'),
						privilege_id: array[0].get('id')
					});
					this.popup(array[0]);
				}
				break;
			case 1:
				if (user.get('rep') >= array[1].get('rep')) {
					this.create({
						user_id: user.get('id'),
						privilege_id: array[1].get('id')
					});
					this.popup(array[1]);
				}
				break;
			case 2:
				if (user.get('rep') >= array[2].get('rep')) {
					this.create({
						user_id: user.get('id'),
						privilege_id: array[2].get('id')
					});
					this.popup(array[2]);
				}
				break;
			case 3:
				if (user.get('rep') >= array[3].get('rep')) {
					this.create({
						user_id: user.get('id'),
						privilege_id: array[3].get('id')
					});
					this.popup(array[3]);
				}
				break;
			default:
				break;
		}
	},
	
	popup: function(privilege) {
		var view = new Gangnam.Views.PopupsPrivilege({
			privilege: privilege
		});
		$('.popup').html(view.render().el);
	}
});
