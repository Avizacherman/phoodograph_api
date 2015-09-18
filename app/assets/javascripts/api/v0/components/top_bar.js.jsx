
var TopBar = React.createClass({
    displayName: 'TopBar',
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
						  <a className="right item" id="get-current-position">
						    <i className="location arrow icon"></i>
						    Current Location
						  </a>
						 
						</div>
        );
    }
});
$(document).ready(function(){
React.render(<TopBar/>, document.getElementById('content'))
$('.ui.labeled.icon.sidebar')
  .sidebar({closable: false})
  .sidebar({dimPage: false})



})