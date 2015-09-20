var InitialTemplate = React.createClass({
	displayName: "initialTemplate",
	getInitialState: function(){ 
		return {restaurants: [], reviews: [], markers: [], filters: [{radius: 100}]}
	},
	
	componentWillMount: function () {


		initialPromise = new Promise(function(resolve) {
		navigator.geolocation.getCurrentPosition(function(pos) {

			if (pos.coords.longitude) {
				App.currentLocation.lat = pos.coords.latitude
				App.currentLocation.lng = pos.coords.longitude
				resolve()
			}
		})
	})
		initialPromise.then(function() {
			 this.updateRestaurants()  
		}.bind(this))	      
	},
	testFilter: function(){
		App.currentLocation.lat = 40.7723585
		App.currentLocation.lng = -73.9561148
		this.setState({filters: [{radius: 1}]}, function(){
					this.updateRestaurants()

		})
	},
	 
	updateRestaurants: function(){
		$.ajax({
			url: (this.props.restaurantURL + '?location=' + App.currentLocation.lat + ',' + App.currentLocation.lng + this.state.filters.map(function(filter){
					key = Object.keys(filter)
					//maps key value pairs to query strings using the filter state that will also update on state changes

					// if(filter === this.state.filters[0]){
					// 	return "?" + key + "=" + filter[key] /*+ "&"*/
					// }

					// if(this.state.filters.indexOf(filter) === this.state.filters.length - 1){
					// 		return  key + "=" + filter[key]
					// 		}
						return '&' + key + "=" + filter[key] /*+ "&"*/

						}.bind(this))),
			method: 'GET'
		})
			.done(function(data){
				console.log(this)
				this.setState({restaurants: data.restaurants})
			}.bind(this))
			.fail(function(err){
				console.log(err)
			})

	},
	currentLocation: function(){
		zoomAndPan()
	},
	updateFilters: function(event){
		event.preventDefault()
		var filterArray = new Array
		var categories = $('#categorySelect').dropdown('get values')	
		filterArray.push({categories: categories})		

		var radius = $('#radius').val() 
		filterArray.push({radius: radius})
		this.setState({filters: filterArray}, function(){
			this.updateRestaurants()

		})

	},
	displayFilters: function(){
		$('#filter-bar')
		.sidebar('setting', 'transition', 'overlay')
		.sidebar('setting', 'dimPage', false)
		.sidebar('setting', 'closable', false)
		.sidebar('toggle')
	},
	render: function(){
		return(
			<div className="pusher" id="base-content">

			<TopBar filter={this.displayFilters}/>

			<div>
				<MapDisplay restaurants={this.state.restaurants} markers={this.state.markers} updateLocation={this.currentLocation}/>
				

			</div>
			<FilterBar className="ui right  vertical sidebar overlay inverted labled icon menu" id="filter-bar" categoryList={this.props.categoryList} updateFilters={this.updateFilters} filters={this.state.filters}/>

			<div className="ui right vertical sidebar inverted labled icon menu" id="review-details">
				
			  </div>
			</div> 
			)
	}
})


$(document).ready(function(){

React.render(<InitialTemplate categoryList={App.categoryList}reviewURL="api/v0/review" restaurantURL="api/v0/restaurant" userURL="api/v0/user"/>, document.querySelector('body') )

})
