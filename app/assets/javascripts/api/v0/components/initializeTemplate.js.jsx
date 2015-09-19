var InitialTemplate = React.createClass({
	displayName: "initialTemplate",
	getInitialState: function(){ return {restaurants: [], reviews: [], filters: [], currentLocation: {}}},
	componentWillMount: function () {


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
		this.setState({currentLocation: {lat: results.lat, lng: results.lng}})
	}.bind(this))
	      
	},

	 zoomAndPan: function(coords) {
		//detrmines if it's manual or automatic
		var method = coords ? "geolocation" : "currentLocation"
		var zoom = App.map.getZoom()

			var zoomOut = setInterval(function() {
				zoom--
				App.map.setZoom(zoom)
				console.log(zoom)
				if (zoom === 13) {
					clearInterval(zoomOut)

				if (method === "currentLocation") {
					navigator.geolocation.getCurrentPosition(function(pos) {
						lat = pos.coords.latitude
						lng = pos.coords.longitude

						if (pos.coords.longitude) {
							console.log(this)
							this.setState({currentLocation: {lat: lat, lng: lng}})

							App.map.panTo(this.state.currentLocation)
							zoom = App.map.getZoom()
							var zoomOut = setInterval(function() {
								zoom++
								App.map.setZoom(zoom)
								if (zoom === 15)
									clearInterval(zoomOut)
							}, 100)						}
								})
							} else {
								App.map.panTo({
									lat: coords.lat,
									lng: coords.lng
								})
							zoom = App.map.getZoom()
							var zoomOut = setInterval(function() {
								zoom++
								App.map.setZoom(zoom)
								if (zoom === 15)
									clearInterval(zoomOut)
							}, 100)				}

							

						}

					
				}, 100)
		
	},
	 
	updateRestaurants: function(filters){
		//Initialized data
		$.ajax({
			url: (this.props.restaurantURL + '?location=' + this.state.currentLocation.lat + ',' + this.state.currentLocation.lng + '&radius=100'),
			method: 'GET'
		})
			.done(function(data){
				this.setState({restaurants: data.restaurants})
			}.bind(this))
			.fail(function(err){
				console.log(err)
			})

	},
	render: function(){
		return(
			<div>
			<div className="pusher" id="base-content">
				<TopBar updateLocation={this.zoomAndPan}/>
				<MapDisplay/>

			</div>
			<div className="ui right vertical sidebar inverted labled icon menu" id="review-details">
				<a className="item">
						    <i className="block layout icon"></i>
						    Topics
						  </a>
						  <a className="item">
						    <i className="filter icon"></i>
						    Filters
						  </a>
						  <a className="right item" id="get-current-position">
						    <i className="location arrow icon"></i>
						    Current Location
						  </a>
			  </div>
			</div> 
			)
	}
})


$(document).ready(function(){

React.render(<InitialTemplate reviewURL="api/v0/review" restaurantURL="api/v0/restaurant" userURL="api/v0/user"/>, document.getElementById('content'))

})
