var TopBar = React.createClass({
    displayName: 'TopBar',
    componentDidMount: function () {

    },
    render: function () {
        return (
						<div className="ui attached top inverted menu" id="top-menu">
						   
						  <Filter onClick={this.props.filter} />
						  
						 
						</div>
        );
    }
});

// var CurrentLocation = React.createClass({
// 	render: function() {return (
// 		<a className="right item" onClick={this.props.onClick} >
// 						    <i className="location arrow icon"></i>
// 						    Current Location
// 						  </a>
// 		)
// 	}
// })

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

// var Second = React.createClass({
// 	render: function() { 
// 		return (
// 		<a className="item" onClick={this.props.onClick}>
// 						    <i className="user icon"></i>
// 						    Second
// 						  </a>
// 				)
// 	}
// })
