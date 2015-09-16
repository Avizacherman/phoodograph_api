class Api::V0::ReviewController < ApplicationController



def index
	offset = params["offset"] ? params["offset"].to_i : 0
	limit = params["limit"] ? params["limit"].to_i : 10
	api_key = session[:api_key] ? session[:api_key] : params["api_key"]

	parameters = []

	if params["rating"]
		parameters << {:rating => params["rating"]}
	end
	if params["hashtags"]
		parameters << {:hashtags => params["hashtags"]}
	end
	if params["username"]
		parameters << {:username => params["username"]}
	end


	reviews = Review.search limit, offset, api_key,  parameters
	render json: {data: reviews} 
	
end

def create
	
end

def show
end

def update
end

def destroy
end



end