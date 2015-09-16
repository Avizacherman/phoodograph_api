$(document).ready(function(){
	var map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 40, lng: -70},
		zoom: 10
	})
	$('h1').click(function(){
		map.setZoom(5)
		navigator.geolocation.getCurrentPosition(function(pos){
		lat = pos.coords.latitude
		lng = pos.coords.longitude
		if(pos.coords.longitude){
			
			map.panTo({lat: lat, lng: lng})
			map.setZoom(10)
		}
	})
	})
})