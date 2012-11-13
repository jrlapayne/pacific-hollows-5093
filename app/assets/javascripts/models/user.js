Gangnam.Models.User = Backbone.Model.extend({
	
	updateRep: function(amount, user_privileges, privileges) {
		this.set({rep: this.get('rep') + amount});
		this.save();
		
		user_privileges.checkForNew(this, privileges);
	},
	
	hasPrivilege: function(user_privileges, privilege) {
		if (user_privileges.where({user_id: this.get('id'), privilege_id: privilege.get('id')})[0]) {
			return true;
		} else {
			return false;
		}
	},
	
	signedInUser: function() {
		return !this.get('is_temp_user');
	},
	
	isAdmin: function() {
		return this.get('is_admin');
	},
	
	userConditions: function(user_privileges, privilege) {
		return (this.signedInUser() && (this.hasPrivilege(user_privileges, privilege) || this.isAdmin()));
	}
});
