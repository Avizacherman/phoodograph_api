var MapDisplay = React.createClass({
			displayName: 'mapDisplay',
			componentDidMount: function() {
				navigator.geolocation.getCurrentPosition(function(pos) {
					if (pos.coords.longitude) {
						App.map = new google.maps.Map(document.getElementById('map'), {
							zoom: 15,
							center: {
								lat: pos.coords.latitude,
								lng: pos.coords.longitude
							}
						})
						var controlDiv = document.createElement('div')
						var locationControl = new CurrentLocationControl(controlDiv, App.map)

						controlDiv.index = 1
						App.map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(controlDiv)		
					}
				})

				//add current location button to map
			function CurrentLocationControl(controlDiv, map) {

			  // Set CSS for the control border.
			  var controlUI = document.createElement('div');
			  controlUI.style.backgroundColor = '#fff';
			  controlUI.style.border = '2px solid #fff';
			  controlUI.style.borderRadius = '3px';
			  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
			  controlUI.style.cursor = 'pointer';
			  controlUI.style.marginBottom = '22px';
			  controlUI.style.marginLeft = '10px';
			  controlUI.style.textAlign = 'center';
			  controlUI.title = 'Go to current location';
			  controlDiv.appendChild(controlUI);

			  // Set CSS for the control interior.
			  var controlText = document.createElement('div');
			  controlText.style.height = '20px';
			  controlText.style.width = '20px';
			  controlText.style.paddingTop = '2px'
			  controlText.style.paddingLeft = '5px';
			  controlText.style.paddingRight = '5px';
			  controlText.style.fontSize = '25px'
			  controlText.style.display = 'table-cell'
			  controlText.style.verticalAlign = 'middle'
				controlText.innerHTML = "<img src='http://images.clipartpanda.com/google-location-icon-519580-076_LocationArrow-512.png' height='15px' width='15px'>"
			  controlUI.appendChild(controlText);

			  // Setup the click event listeners: simply set the map to Chicago.
			  controlUI.addEventListener('click', function() {
			  	zoomAndPan()
			  });

				}

				

			},
			render: function() {
				return ( <div> <div id = "map"
					ref = "map"
					style = {
						{
							height: "100%"
						}, {
							position: "absolute"
						}
					}
					/>  <MapRestaurantMarkers restaurants={this.props.restaurants} markers={this.props.markers} / > 
					< /div>)
				}
			})

		var MapRestaurantMarkers = React.createClass({
			render: function() {
				if (App.map) {
					//check for and remove duplicates from restaurant
					this.props.markers.forEach(function(marker, index) {

						this.props.restaurants.forEach(function(restaurant) {
							var markerGeodata = {
								lat: marker.getPosition().H,
								lng: marker.getPosition().L
							}
							if (restaurant.geodata === markerGeodata) {

								this.props.restaurant.splice(index, 1)
							}
						}.bind(this))
					}.bind(this))
					console.log("restaurants: ", this.props.restaurants)
					this.props.restaurants.forEach(function(restaurant) {
							var marker = new google.maps.Marker({
								map: App.map,
								position: restaurant.geodata,
								restaurantID: restaurant.id
							})
							this.props.markers.push(marker)
						}.bind(this))
								//check markers and clear those that no longer match restaurant data
						
					this.props.markers.forEach(function(marker, index) {

						if (!_.find(this.props.restaurants, function(obj) {	 	
								return obj.id === marker.restaurantID
							})) {
							
							marker.setMap(null)
						}

						// }
					}.bind(this))
					//update array to reflect markers that are on the map
					this.props.markers = this.props.markers.map(function(marker){
						if(marker.getMap() != null){
							return marker
						} 
					})


				}
				return null
			}
		})

