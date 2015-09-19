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
						  <Filter onClick={this.props.filter} />
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

var Filter = React.createClass({
	render: function() { 
		return (
		<a className="item" onClick={this.props.onClick}>
						    <i className="filter icon"></i>
						    Filters
						  </a>
				)
	}
})
