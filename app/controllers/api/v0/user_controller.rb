class Api::V0::UserController < ApplicationController

def show
	user = User.find(params["id"])
	render json: User.sanitize(user)
end

def create
	binding.pry
	user = User.create(user_params)
	if user.valid?
		render json: User.sanitize(user)
	else
		render json: user.errors.messages
	end

end

def update
end

def destroy
	user = User.find(params["id"])
	user.destroy
	render nothing: true
end

private 

def user_params
	params.permit(:username, :password, :password_confirmation, :email)
end

end