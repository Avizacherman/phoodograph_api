

var MapDisplay = React.createClass({
	displayName: 'mapDisplay',
	componentDidMount: function(){
		console.log(this.props)
		 App.map = new google.maps.Map(document.getElementById('map') , {
				zoom: 15,
				center: {lat: 40, lng: 73}
				})
		console.log(map)
	},
	render: function(){
	return ( <div id="map" style={{height: "100%"}, {position: "absolute"}}> </div>)

	}
})

// var Map = React.createClass({

// })
// $(document).ready(function(){
// })