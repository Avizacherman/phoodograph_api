//= require_self
//= require_tree ./models
//= require_tree ./collections
//= require_tree ./components
//= require_tree ./views

App = {
	Models: {},
	Collections: {},
	Views: {},
	currentLocation: {
		lat: 0,
		lng: 0
	}
}

$(document).ready(function() {
	$.ajaxSetup({
		data: {
			api_key: "DKEkxQrvqYzkrAn3TRW45uc50F349a7wUA"
		}
	})

	// App.Router = Backbone.Router
})