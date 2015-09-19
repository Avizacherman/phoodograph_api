var TopBar = React.createClass({
    displayName: 'TopBar',
    componentDidMount: function () {

    },
    render: function () {
        return (
						<div className="ui top attached inverted menu" id="top-menu">
						   <a className="item">
						    <i className="block layout icon"></i>
						    Topics
						  </a>
						  <a className="item">
						    <i className="filter icon"></i>
						    Filters
						  </a>
						  <CurrentLocation onClick={this.props.updateLocation}/>
						  
						 
						</div>
        );
    }
});

var CurrentLocation = React.createClass({
	render: function() {return (
		<a className="right item" onClick={this.props.onClick} >
						    <i className="location arrow icon"></i>
						    Current Location
						  </a>
		)
	}
})
