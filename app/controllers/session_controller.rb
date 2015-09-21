class SessionController < ApplicationController
	
	def login
		user = User.find_by username: params["username"]
			if(user.authenticate params["password"])
				user.update(:api_key => SecureRandom.urlsafe_base64(25))
				session[:api_key] = user.api_key
				render json: {:login => true, :username => user.username}
			else
				render json: {:login => false, :error => "invalid password"}
			end
	end

	def logout
			reset_session
			render json: {:logout => 'succeeded'}
	end

	def login_status
		user = User.find_by(:api_key =>session[:api_key])

		if(user)
			user.update(:api_key => SecureRandom.urlsafe_base64(25))
			session[:api_key] = user.api_key
			render json: {:logged_in => true, :username => user.username}
		else
			render json: {:logged_in => false}
		end
	end

	protected

	def login_params
		params.permit(:username, :password)
	end
end