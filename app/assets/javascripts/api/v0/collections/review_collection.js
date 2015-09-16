App.Collections.ReviewCollection = Backbone.Collection.extend({
	url: '/api/v0/review',
	model: App.Models.ReviewModel,
	parse: function(response){
		return response.reviews
	}
})