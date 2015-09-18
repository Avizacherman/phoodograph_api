$(document).ready(function() {
	//initialize geocoder and timezone
	var geocoder = new google.maps.Geocoder

	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 15,
	})
	var timezone = jstz.determine().name()
	var approximateLocation = timezone.replace(/\w+\//, '').replace(/_/, ' ')
	var initialCoordinates

	initialPromise = new Promise(function(resolve) {
		navigator.geolocation.getCurrentPosition(function(pos) {

			if (pos.coords.longitude) {
				resolve({
					lat: pos.coords.latitude,
					lng: pos.coords.longitude
				})
			}
		})
	})

	initialPromise.then(function(results) {
		App.currentLocation = results
		map.setCenter(App.currentLocation)
	})



	zoomAndPan({
		lat: 50,
		lng: -50
	})

	function zoomAndPan(coords) {
		//detrmines if it's manual or automatic
		var method = coords ? "geolocation" : "currentLocation"
		var zoom = map.getZoom()

		var navigationPromise = new Promise(function(resolve, reject) {
			var zoomOut = setInterval(function() {
				zoom--
				map.setZoom(zoom)
				console.log(zoom)
				if (zoom === 13) {
					clearInterval(zoomOut)
					resolve()
				}
			}, 100)

		})
		navigationPromise.then(function() {

			nextPromise = new Promise(function(resolve) {
				if (method === "currentLocation") {
					navigator.geolocation.getCurrentPosition(function(pos) {
						lat = pos.coords.latitude
						lng = pos.coords.longitude

						if (pos.coords.longitude) {

							App.currentLocation = {
								lat: lat,
								lng: lng
							}

							map.panTo(App.currentLocation)
							resolve()
						}
					})
				} else {
					map.panTo({
						lat: coords.lat,
						lng: coords.lng
					})
					resolve()
				}
			})
			nextPromise.then(function() {
				zoom = map.getZoom()
				var zoomOut = setInterval(function() {
					zoom++
					map.setZoom(zoom)
					if (zoom === 15)
						clearInterval(zoomOut)
				}, 100)

			})


		})
	}


	$('#get-current-position').click(function() {
		zoomAndPan()

	})


})