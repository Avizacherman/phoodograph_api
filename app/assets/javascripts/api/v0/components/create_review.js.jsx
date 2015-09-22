var CreateReviewSideBar = React.createClass({

	render: function(){
		return (
		<div className="ui left verticle sidebar" id="create-review-bar">
			<h1 className="ui center aligned header"> Add Review </h1>
			<div className="ui form" id="#create-review-form">
				<RestaurantName/>
				<textarea placeholder="Review" rows="5" style={{resize: "none"}} id="input-full-review" name="full-review"/>
				<PictureUpload/>
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
			$.ajax({
				url: 'check_restaurants',
				data: {pid: App.currentPlace.placeId, name: App.currentPlace.name},
				method: 'GET'
			}).done(function(data){
				if(!data.id){
					$('#review-assc-restaurant').addClass("ui error")
					$('#no-restaurant').toggleClass('hidden').toggleClass('visible')
					}
					App.currentPlace.dbID = data.id
			
			})
		})
		
	},
	render: function(){
		return(
			<div className="field">
				<input id="review-assc-restaurant" name="associated-restaurant" placeholder="Restaurant"/>
				<div className="ui hidden error message" id="no-restaurant"> This is not currently in the system. You will be asked to create it before submitting your review</div>
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
				<img id="preview-image"/>
				<input type="file" id="review-upload-picture"/>
			</div>
			)
	}
})