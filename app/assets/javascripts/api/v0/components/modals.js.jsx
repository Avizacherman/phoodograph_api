var ModalControler = React.createClass({
	render: function(){
		return (
			<div>
				<LoginModal updateLoginStatus={this.props.updateLoginStatus}/>
				<NewUserModal updateLoginStatus={this.props.updateLoginStatus}/>
			</div>
			)
	}
})

var LoginModal = React.createClass({
	componentDidMount: function(){

		$('#login-form').on('keydown', function(e){
			if (e.keyCode == 13){
				this.runLogIn()
			}
		}.bind(this))
	},
	runLogIn: function(){
		var username = $('#login-user').val()
		var password = $('#login-pw').val()
		$.ajax({
			url: '/login',
			method: "POST",
			data: {username: username, password: password}
		}).done(function(data){
			if(data.login){
				this.props.updateLoginStatus(true)
				$('#login-modal').modal('hide')
				$('#login-form').form('clear')
				$('#login-error-message').addClass('hidden').removeClass('visible')
			} else {
			  $('#login-user-field').addClass('error')
				$('#login-pw-field').addClass('error')
				$('#login-error-message').removeClass('hidden').addClass('visible')
			}
		}.bind(this))
	},
	close: function(){
		$('#login-modal').modal('hide')
	},
	render: function(){

		return (
			<div className="ui basic modal" id="login-modal">
				<div className="header"> Log In </div>
				<div className="content">
					<div className="ui form" id="login-form">
						<div id="login-user-field" className="field">
							<input ref="loginUser" placeholder="User Name" id="login-user"/>
						</div>
						<div id="login-pw-field"className="field">
							<input ref="loginPW" placeholder="Password" type="password" id="login-pw"/>
						</div>
						<div className="ui hidden error message" id="login-error-message">
							Invalid Username or Password
						</div>
							<div className="ui basic blue labeled icon button" onClick={this.runLogIn}>
								<i className="sign in icon"></i>
								Log In
							</div>
							<div className="ui basic red labeled icon cancel button" onClick={this.close}>
								<i className="remove icon"></i>
								Cancel
							</div>
					</div>
				</div>
			</div>
			)
	}
})

var NewUserModal = React.createClass({
	close: function(){
		$('#new-user-modal').modal('hide')
	},
	componentDidMount: function () {
	  $('#new-user-display-name').checkbox('set checked')	
	  
	  $('#new-user-form').on('keydown', function(e){
			if (e.keyCode == 13){
				this.createAccount()
			}
		}.bind(this))

	  $('#new-user-form').form({ 
	  	fields: {
	  		username: {
	  			identifier: 'username',
	  			rules: [
		  			{type: 'empty',
		  			prompt: 'Please enter a user name'
		  			}, 
		  			{type: 'regExp[/^[a-z,A-Z,0-9]+$/gi]',
  					prompt: 'Username may only be letters or numbers'}	
  				],
  			}, password: {
  				identifier: 'password',
  				rules: [
  					{type: 'match[confirm]',
  					prompt: 'Passwords must match'},
  					{type: 'empty',
  					prompt: 'Password field may not be empty'},
  					{type: 'minLength[8]',
  					prompt: 'Passwords must be at least 8 characters'},
  					{type: 'regExp[/^[a-z,A-Z,0-9]+$/gi]',
  					prompt: 'Passwords may only be letters or numbers'}			
					]
	  		}, email: {
	  			identifier: 'email',
	  			rules: [
	  			{type: 'empty',
	  			prompt: 'E-mail may not be empty'},
	  			{type: 'email',
	  			prompt: 'E-mail must be a valid e-mail address'}
	  			]
	  		},
	  		confirm: {
	  			identifier: 'confirm',
	  			rules: [{
	  				type: 'match[password]',
	  				prompt: 'Passwords must match'
	  			}]
	  		},
	  		realname: {
	  			identifier: 'realname',
	  			rules: [
	  			{type: 'empty',
	  			prompt: 'You must provide your real name'}
	  			]
	  		}

	  	}, 
	  	inline: true,
	  	on: 'blur'

	  })    
	},
	createAccount: function(){
		var username = $('#new-user-username').val()
		var password = $('#new-user-password').val()
		var realName = $('#new-user-realname').val()
		var email = $('#new-user-email').val()
		if($('#new-user-form').form('is valid')){
			$.ajax({
				url: 'api/v0/user',
				data: {username: username, password: password, real_name: realName, email: email},
				method: 'POST'
			}).done(function(data){
				if(Object.keys(data)[0]==='error'){
					
				} else {
					this.props.updateLoginStatus(true)
					$('#new-user-modal').modal('toggle')
				}

			}.bind(this)).fail(function(err){
				console.log(err)
			})
		}
	},
	render: function(){
		return (
			<div className="ui basic modal" id="new-user-modal">
			<div className="header">
				Create New Account
			</div>
			<div className="content">
				<div className="ui form" id="new-user-form">
					<div className="field" id="new-user-name-field">
						<input placeholder="Username" id="new-user-username"name="username"/>
						</div>
					<div className="field" id="new-user-realname-field">
						<input placeholder="Full Name" name="realname" id="new-user-realname"/>
					</div>

					<div className="field" id="new-user-password-field">
						<input type="password" name="password" placeholder="Password" id="new-user-password"/>
					</div>
					<div className="field" id="new-user-confirm-field">
						<input type="password" name="confirm" placeholder="Confirm Password" id="new-user-confirm"/>
					</div>					
					<div className="field" id="new-user-email-field">
						<input placeholder="E-mail" name="email" id="new-user-email"/>
					</div>
					
					<div className="ui blue basic labeled icon submit button" onClick={this.createAccount}>
						<i className="add user icon"> </i>
						Create Account
					</div>					
					<div className="ui basic red labeled icon cancel button" onClick={this.close}>
							<i className="remove icon"></i>
								Cancel
							</div>
						<div className="ui error message"></div>
						</div>
					</div>
				</div>	

			)
	}
})

//placeholder for later option
// <div className="field" id="new-user-toggle-field">
// 						<div className="ui toggle checkbox">
// 							<input type="checkbox" name="check-name" id="new-user-display-name"/> 
// 								<label for="new-user-display-name" id="basic-label-checkbox"> Allow others to see your full name </label>
// 						</div>
// 					</div>		