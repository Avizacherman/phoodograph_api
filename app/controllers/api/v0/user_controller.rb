class Api::V0::UserController < ApplicationController

def show
	user = User.find(params["id"])
	render json: User.sanitize_password(user)
end

def create
end

def update
end

def destroy
	user = User.find(params["id"])
	user.destroy
	render nothing: true
end

end