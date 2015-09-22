var RestaurantSideBar = React.createClass({
	closeRestaurant: function(){
		$('#restaurant-bar').sidebar('toggle')
	},
	componentDidUpdate: function () {
	    $('#fixed-rating').rating({
	    	initialRating: this.props.restaurantDetails.average_rating
	    })  
	    	.rating('disable')
	 
	},
	render: function(){
		if(this.props.restaurantDetails.reviews){
		var recentReview = this.props.restaurantDetails.reviews[this.props.restaurantDetails.reviews.length - 1]

		var imageUrls = this.props.restaurantDetails.reviews.map(function(review){
			return review.img_url
		})
		}else {
			var recentReview = []
			var imageUrls = []
		} 
		return (
			<div className="ui right vertical sidebar" id="restaurant-bar">
				<span id="close-restaurant" className="ui top attached fixed" onClick={this.closeRestaurant}> X </span>
				<h1 className="ui center aligned header"> {this.props.restaurantDetails.name} </h1>
				<div className="ui center aligned container">
					<RestaurantImageRotator images={imageUrls}/>
					<RestaurantCategories categories={this.props.restaurantDetails.categories}/>
					<div id="fixed-rating" className="ui star rating" data-max-rating="5"/>
					<RecentReview review={recentReview}/>
					<br/>
					<a id="view-all-reviews"> View All Reviews </a>
				</div>
			</div>
			)
	}
})	

var RestaurantImageRotator = React.createClass({
	componentDidUpdate: function () {
	 		clearInterval(App.imageRotation)
	 		var state = "tails"
 		 $('#rotating-image-tails').show()
 		 $('#rotating-image-heads').show()
	  
	  $('#rotating-image-tails').attr('src', this.props.images[this.props.images.length-1])

	  if(this.props.images.length > 1){
	  	App.imageRotation = setInterval(function(){

	  		if(state === "tails"){
  			 state = "heads"
		 		 $('#rotating-image-tails').fadeOut('slow')
  			 $('#rotating-image-heads').fadeIn('slow').attr('src', this.props.images[Math.floor(Math.random()*this.props.images.length-1)])
	  		} else {
	  			state = "tails"
	  			$('#rotating-image-tails').fadeIn('slow').attr('src', this.props.images[Math.floor(Math.random()*this.props.images.length-1)])
  			 $('#rotating-image-heads').fadeOut('slow')		 
	  		}
	 		}.bind(this), 3500)
	  }
	},
	render: function(){

		return (
		<div id="rotating-image-holder" className="ui center aligned basic segment">
			<img ref="rotatingImageTails" className="rotating-image" height="200px" width="200px" id="rotating-image-tails" />
			<img ref="rotatingImageHeads" className="rotating-image"height="200px" width="200px" id="rotating-image-heads" />
		</div>
		)
	}
})

var RestaurantCategories = React.createClass({
	
	render: function(){
		if(this.props.categories){
			var categoryList = this.props.categories.map(function(category){	
			return (<div className="ui label"> {category} </div>)
			})
		}
		return (
			<div className="ui basic segment" id="category-box"> {categoryList} </div>
			)

	}
})

var RecentReview = React.createClass({
	componentDidUpdate: function () {
	      $('#snap-rating').rating({
	    	initialRating: this.props.review.rating
	    })  
	    	.rating('disable')
	},
	render: function(){
		if(this.props.review.full_review){
		
		return (
		<div className="ui basic segment" id="recent-review-box">
		<h4>Most Recent Review </h4>
		<div id="recent-review-text-box" dangerouslySetInnerHTML ={ {__html: this.props.review.full_review.replace(/#\w+/gi, function(string, index){

					var hashtagID = string.replace(/#/, '')
					var hashtagKey = string.replace(/#/, '')+index
					return "<a id=" + hashtagID + ">" + string + "</a>" 
		})}}/>
		<div className = "ui image label"> 
			{this.props.review.user}
		</div>
		<div id="reviewTime">
			{moment(this.props.review.date
).tz(App.timezone).format('L - h:mm a zz')}
		</div>
		<div id="snap-rating" className="ui star rating" data-max-rating="5"/>
		</div>
		)
		
	} else {
		hashtaggedReview = []
	}
		return (
			<div>
			</div>
			)
	}
})