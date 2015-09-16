//= require_self
//= require_tree ./models
//= require_tree ./collections
//= require_tree ./components
//= require_tree ./views

App = {Models: {}, Collections: {}, Views: {}}

$(document).ready(function(){
	$.ajaxSetup({
  data: {
    api_key: "i0kdHyOiETeq2iHlPE1wB6DgXuP65APqNg"
  	}
	})
})