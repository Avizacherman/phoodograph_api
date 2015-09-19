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
	currentLocation: function(){
		zoomAndPan()
	},
	render: function(){
		return(
			<div>
			<div className="pusher" id="base-content">
				<TopBar updateLocation={this.currentLocation}/>
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
