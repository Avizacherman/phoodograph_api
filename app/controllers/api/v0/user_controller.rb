class Api::V0::UserController < ApplicationController

def show
	stuff = User.all
	# binding.pry
	render json: stuff.sanitize_password(stuff)

end

end