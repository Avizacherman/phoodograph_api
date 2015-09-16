App.Collections.RestaurantCollection = Backbone.Collection.extend({
	url: 'api/v0/restaurant',
	model: App.Models.RestaurantModel,
	parse: function(response){
		return response.restaurants
	}
})