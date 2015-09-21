var RestaurantSideBar = React.createClass({
	closeRestaurant: function(){
		$('#restaurant-bar').sidebar('toggle')
	},
	render: function(){
		return (
			<div className="ui right vertical sidebar labled icon menu" id="restaurant-bar">
				<span id="close-restaurant" onClick={this.closeRestaurant}> X </span>
				<h1 className="ui center aligned header"> {this.props.restaurantDetails.name} </h1>
			</div>
			)
	}
})	