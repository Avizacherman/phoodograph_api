class Api::V0::UserController < ApplicationController

def show
	user = User.find(params["id"])
	render json: User.sanitize(user)
end

def create

	user = User.create(user_params)
	
	if user.valid?
		session[:api_key] = user.api_key
		render json: {login: true}
	else
		render json: {error: user.errors.messages}
	end

end

def update
end

def destroy
	user = User.find(params["id"])
	user.destroy
	reset_session
	render nothing: true
end

private 

def user_params
	params.permit(:username, :password, :email, :real_name)
end

end