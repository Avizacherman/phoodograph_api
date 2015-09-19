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
					}
				})
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
					/>  <MapRestaurantMarkers restaurants={this.props.restaurants} markers={this.props.markers} / > < /div>)
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
								position: restaurant.geodata
							})
							this.props.markers.push(marker)
						}.bind(this))
								//check markers and clear those that no longer match restaurant data
						
					this.props.markers.forEach(function(marker, index) {
						var markerGeodata = {
							lat: marker.getPosition().H,
							lng: marker.getPosition().L
						}
						if (!_.filter(this.props.restaurants, function(obj) {	 
								return obj.geodata === markerGeodata
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