var InitialTemplate = React.createClass({
	displayName: "initialTemplate",
	getInitialState: function(){ 
		return {loginStatus: 'middle', restaurants: [], reviews: [], currentRestaurant: {}, filters: [{radius: 20}, {rating: 1}]}
	},
	updateLoginStatus: function(bool){
		this.setState({loginStatus: bool})
	},
	componentWillMount: function () {

		this.loginControl()
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
	componentDidMount: function(){
		App.restaurantUpdateInterval = setInterval(function(){
			this.updateRestaurants()
		}.bind(this), 10000)

	},
	 
	updateRestaurants: function(){
		if(this.state.filters){
		var queryString = "&" + this.state.filters.map(function(filter){
					
					key = Object.keys(filter)

					//maps key value pairs to query strings using the filter state that will also update on state changes

					// if(filter === this.state.filters[0]){
					// 	return "?" + key + "=" + filter[key] /*+ "&"*/
					// }

					// if(this.state.filters.indexOf(filter) === this.state.filters.length - 1){
					// 		return  key + "=" + filter[key]
					// 		}
					if(key[0] === 'categories'){
						
						return  '&' + key[0] + "=" + filter[key[0]].join().toLowerCase()
					} else {

						return key[0] + "=" + filter[key[0]] /*+ "&"*/
					}
						}).join('&')
				}

		$.ajax({
			url: (this.props.restaurantURL + '?location=' + App.currentLocation.lat + ',' + App.currentLocation.lng + queryString ),
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
	updateFilters: function(event){
		if(event){
			event.preventDefault()
		}

		var filterArray = new Array
		var categories = $('#category-select').dropdown('get values')
		categories.pop()	
		if(categories[0] != null && categories[0] != ""){
			
		filterArray.push({categories: categories})		
		}

		var radius = $('#radius-input').val() 
		filterArray.push({radius: radius})

		var rating = $('#rating-filter').rating('get rating')
		filterArray.push({rating: rating})
		this.setState({filters: filterArray}, function(){
			this.updateRestaurants()

		})

	},
	
	displayFilters: function(){
		if($('#create-review-bar').sidebar('is visible')){
			$('#create-review-bar').sidebar('toggle')
		}
		$('#filter-bar')
		.sidebar('setting', 'transition', 'overlay')
		.sidebar('setting', 'mobileTransition', 'overlay')
		.sidebar('setting', 'dimPage', false)
		.sidebar('setting', 'closable', false)
		.sidebar('toggle')

		if($('html').attr('class')==='ios'){
			$('#filter-bar').sidebar('setting', 'exclusive', true)
		}
	}, 
	displayReviewBar: function(){
		if($('#filter-bar').sidebar('is visible')){
			$('#filter-bar').sidebar('toggle')
		}

		$('#create-review-bar').sidebar('setting', 'transition', 'overlay')
				.sidebar('setting', 'mobileTransition', 'overlay')
				.sidebar('setting', 'dimPage', false)
				.sidebar('setting', 'closable', false)
				.sidebar('toggle')
		if($('html').attr('class')==='ios'){
				$('#create-review-bar').sidebar('setting', 'exclusive', true)		
			}
	},
	populateRestaurant: function(id){
		$('#restaurant-bar')
		.sidebar('setting', 'transition', 'overlay')
		.sidebar('setting', 'mobileTransition', 'overlay')
		.sidebar('setting', 'dimPage', false)
		.sidebar('setting', 'closable', false)
		if($('html').attr('class')==='ios'){
					$('#restaurant-bar').sidebar('setting', 'exclusive', true)
					
		}

		$.ajax({
			url: this.props.restaurantURL + '/' + id,
			method: 'GET'
		}).done(function(data){
			this.setState({currentRestaurant: data}, function(){
				if($('#restaurant-bar').sidebar('is hidden'))
				$('#restaurant-bar').sidebar('toggle')
			})
		}.bind(this)).fail(function(err){
			console.log(err)
		})
	}, 
	loginControl: function(){
		var status = false
       $.ajax({
       	url: '/login_status',
       	method: 'GET'
       }).done(function(data){
       	if(data.logged_in){
       		this.setState({loginStatus: true})
       	}else {
       		this.setState({loginStatus: false})
       	}
       }.bind(this))
	},

	render: function(){
		return(
			<div className="pusher" id="base-content">

			<TopBar filter={this.displayFilters} loginStatus={this.state.loginStatus} updateLoginStatus={this.updateLoginStatus} addReview={this.displayReviewBar}/>

				<MapDisplay restaurants={this.state.restaurants} markers={this.props.markers} updateLocation={this.currentLocation} populateRestaurant={this.populateRestaurant}/>
				

			<FilterBar categoryList={this.props.categoryList} updateFilters={this.updateFilters} filters={this.state.filters} id="filter-bar"/>

			<RestaurantSideBar ref="restaurantSideBar"restaurantDetails={this.state.currentRestaurant} id="restaurant-bar"/>
			
			<CreateReviewSideBar id="create-review-bar" categoryList={this.props.categoryList} updateRestaurants={this.updateRestaurants}/>

				
			<ModalControler updateLoginStatus={this.updateLoginStatus}/>
			  </div>
			)
	}
})


$(document).ready(function(){

React.render(<InitialTemplate markers={[]} categoryList={App.categoryList}reviewURL="api/v0/review" restaurantURL="api/v0/restaurant" userURL="api/v0/user"/>, document.querySelector('body') )

})
