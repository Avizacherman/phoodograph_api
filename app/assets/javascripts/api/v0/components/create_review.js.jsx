var CreateReviewSideBar = React.createClass({
	createReview: function(){
		var that=this
		App.formData.append('image', App.file)
		App.formData.append('full_review', $('#input-full-review').val())
		App.formData.append('rating', $('#review-rating').rating('get rating'))
		if(!App.currentPlace.dbID){

			var categories = $('#ass-cat-select').dropdown('get values')
			categories.pop()
			
			$.ajax({
				url: 'api/v0/restaurant',
				method: 'POST',
				data: {name: App.currentPlace.name, lat: App.currentPlace.lat, lng: App.currentPlace.lng, categories: categories, g_places_id: App.currentPlace.placeId}
			}).done(function(data){
				console.log(data.data.id)
				App.currentPlace.dbID = data.data.id
				App.formData.append('restaurant_id', data.data.id)
				$.ajax({
					url: 'api/v0/review',
					method: 'POST',
					data: App.formData,
					contentType: false,
					processData: false,
					multipart: true
				}).done(function(data){
					that.props.updateRestaurants()
					App.formData = new FormData
					that.cancel()
				}).fail(function(data){
					console.log(data)
				})
				$('#no-restaurant').toggleClass('hidden').toggleClass('visible')
				$('#ass-cat').toggle()
			})
		} else {
			App.formData.append('restaurant_id', App.currentPlace.dbID)
			$.ajax({
					url: 'api/v0/review',
					method: 'POST',
					data: App.formData,
					contentType: false,
					processData: false, 
					multipart: true
				}).done(function(data){
					that.props.updateRestaurants()
					App.formData = new FormData
					that.cancel()
				}).fail(function(data){
					console.log(data)
				})
		}
	},
	cancel: function(){
	$('#review-assc-restaurant').val('')
	$('#ass-cat-select').dropdown('clear')
	$('#input-full-review').val('')
	$('#review-upload-picture').val('')
	$('#preview-image').attr('src', '')
	$('#review-rating').rating('set rating', 1)
		$('#create-review-bar').sidebar('toggle')
	},
	render: function(){
		return (
		<div className="ui left verticle sidebar" id="create-review-bar">
			<h1 className="ui center aligned header"> Add Review </h1>
			<div className="ui center aligned container">
			<div className="ui form" id="#create-review-form">
				<RestaurantName categoryList={this.props.categoryList}/>
				<div className="field">
					<textarea placeholder="Review" rows="5" style={{resize: "none"}} id="input-full-review" name="full-review"/>
				</div>
				<PictureUpload/>
				<RateRestaurant/>
				<div className="ui buttons">
					<div className="ui blue labeled icon button" onClick={this.createReview}>
						<i className="food icon"></i>
						Add Review
					</div>
					<div className="ui red labeled icon button" onClick={this.cancel}>
						<i className="remove icon"></i>
						Cancel
					</div>
				</div>
			 </div>
			</div>
		</div>

			)
	}
})

var RestaurantName = React.createClass({
	componentDidMount: function () {
		$('#review-assc-restaurant').on('autocompleteDone', function(){
			App.currentPlace.name = App.autocomplete.getPlace().name
			App.currentPlace.placeId = App.autocomplete.getPlace().id
			App.currentPlace.lat = App.autocomplete.getPlace().geometry.location.H
			App.currentPlace.lng = App.autocomplete.getPlace().geometry.location.L
			$.ajax({
				url: 'check_restaurants',
				data: {pid: App.currentPlace.placeId, name: App.currentPlace.name},
				method: 'GET'
			}).done(function(data){
				if(!data.id){
					$('#no-restaurant').toggleClass('hidden').toggleClass('visible')
					$('#ass-cat').toggle()
					}
					App.currentPlace.dbID = data.id
			
			})
		})
		$('#ass-cat-select').attr('multiple', '')
		$('#ass-cat-select').dropdown()
		$('#ass-cat-select').css('display', 'inline')
	},
	render: function(){

		var categoryOptions = this.props.categoryList.map(function(category, index){
			var optionIndex = "up-" + index
			return (
				<option key={optionIndex} value={category.toLowerCase()}> {category} </option>
				)
		})
		return(
			<div>
				<div className="field">
					<input id="review-assc-restaurant" name="associated-restaurant" placeholder="Restaurant"/>

					<div className="ui hidden message" id="no-restaurant">This restaurant is not currently in the system. Please add at least one category for this restaurant</div>
					</div>
					<div className="ui field" id="ass-cat" style={{display: "none"}}>
						<label id="categoryLabel"> Categories</label>
						<select className="ui fluid search dropdown" ref="selectBox" id="ass-cat-select">
						<option value=""></option>
						{categoryOptions}
				   </select>
				</div>
			</div>
			)
	}
})

var PictureUpload = React.createClass({
	componentDidMount: function () {

	     App.fileReader = new FileReader
	     App.formData = new FormData
	   	 App.fileReader.onload = function(data){
      	
	    	$('#preview-image').attr('src', data.target.result)

	    }

	    $('#review-upload-picture').on('change', function(){
	    	App.file = $('#review-upload-picture')[0].files[0]
	    	App.formData.append('image', App.file)	
	    	App.fileReader.readAsDataURL(App.file)
	    })  
	},
	render: function(){
		return (
			<div className="field">
				<input type="file" id="review-upload-picture"/>
				<img id="preview-image" height="50px" width="50px"/>

			</div>
			)
	}
})



var RateRestaurant = React.createClass({
	componentDidMount: function () {
	    $(React.findDOMNode(this.refs.ratingFilter)).rating()
	},
	render: function(){
		return(
			<div className="field">
							<label id="rating-label">Review Score</label>
			<div className="ui star rating" data-rating="1" ref="ratingFilter" id="review-rating" data-max-rating="5"/>
			</div>
			)
	}
})