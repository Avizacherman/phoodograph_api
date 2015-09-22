	var TopBar = React.createClass({
    
    render: function () {

       if(this.props.loginStatus){
       	return (
						<div className="ui attached top menu" id="top-bar">
						   
						  <Filter onClick={this.props.filter} />	
						  <AddReview onClick={this.props.addReview}/>				
						  <div className="right menu">
						  	<LogOutButton updateLoginStatus={this.props.updateLoginStatus}/>
						  </div>
						</div>
						)
       } else if (!this.props.loginStatus){
        return (
						<div className="ui attached top menu" id="top-bar">
						   
						  <Filter onClick={this.props.filter} />					
						  <div className="right menu">
						  	<LogInButton/>
						  	<CreateAccountButton/>
						  </div>
						</div>
        );
      } else {
      	return (
						<div className="ui attached top menu" id="top-bar"/>
						
						)
      }

    }
});


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

var LogInButton = React.createClass({
	openLogin: function(){
		$('#login-modal').modal('show')
		.modal('closeable', false)
	},
	render: function(){
		return (
			<a className="item" onClick={this.openLogin}>
				<i className="sign in icon"></i>
				Log In
			</a>
			)
	}
})

var CreateAccountButton = React.createClass({
	openCreateAccount: function(){
		$('#new-user-modal').modal('show')
	},
	render: function(){
		return (
			<a className="item" onClick={this.openCreateAccount}>
				<i className="add user icon"></i>
				New Account
				</a>
			)
	}
})

var LogOutButton = React.createClass({
	logOut: function(){
		$.ajax({
			url: '/logout',
			method: 'GET'
		}).done(function(data){
			this.props.updateLoginStatus(false)
		}.bind(this))
	},
	render: function(){
		return (
			<a className="item" onClick={this.logOut}>
				<i className="sign out icon"></i>
				Log Out
			</a>
					)
	}
})

var AddReview = React.createClass({
	render: function(){
		return (
			<a className="item" onClick={this.props.onClick}>
				<i className="plus icon"></i>
				Add Review
			</a>
			)
	}
})