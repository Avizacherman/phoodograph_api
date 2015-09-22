
	//initialized App Variables
	App.geocoder = new google.maps.Geocoder
	App.timezone = jstz.determine().name()
	

	
	function zoomAndPan(coords) {
		//detrmines if it's manual or automatic
		var method = coords ? "geolocation" : "currentLocation"
		var map = App.map
		var zoom = map.getZoom()


		var navigationPromise = new Promise(function(resolve, reject) {
			var zoomOut = setInterval(function() {
				zoom--
				map.setZoom(zoom)
				console.log(zoom)
				if (zoom < 13) {
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
				var zoomIn = setInterval(function() {
					zoom++
					map.setZoom(zoom)
					if (zoom > 15)
						clearInterval(zoomIn)
				}, 100)

			})


		})
	}


	


