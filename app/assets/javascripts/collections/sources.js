Gangnam.Collections.Sources = Backbone.Collection.extend({
	
	model: Gangnam.Models.Source,
	url: 'sources',
	
	updateFromFedit: function(fedit) {
		var old_sources = this.where({fact_id: fedit.get('fact_id')});
		var new_sources = fedit.get('urls').split(' ');
		var length = old_sources.length - new_sources.length;
		
		if (length > 0) {
			for (i = 0; i < new_sources.length; i++) {
				old_sources[i].set({url: new_sources[i]});
				old_sources[i].save();
			}
			for (i = old_sources.length; i > new_sources.length; i--) {
				old_sources[i - 1].destroy();
			}
		} else if (length === 0) {
			for (i = 0; i < new_sources.length; i++) {
				old_sources[i].set({url: new_sources[i]});
				old_sources[i].save();
			}
		} else {
			for (i = 0; i < old_sources.length; i++) {
				old_sources[i].set({url: new_sources[i]});
				old_sources[i].save();
			}
			for (i = new_sources.length; i > old_sources.length; i--) {
				this.create({
					fact_id: fedit.get('fact_id'),
					url: new_sources[i - 1]
				});
			}
		}
	}
});
