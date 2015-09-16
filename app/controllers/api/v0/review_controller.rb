class Api::V0::ReviewController < ApplicationController

def index
	offset = params["offset"] ? params["offset"].to_i : 0
	limit = params["limit"] ? params["limit"].to_i : 10
	parameters = []

	if params["rating"]
		parameters << {:rating => params["rating"]}
	end
	if params["hashtags"]
		parameters << {:hashtags => params["hashtags"]}
	end

	reviews = Review.search limit, offset, parameters
	render json: {data: reviews} 
end

end