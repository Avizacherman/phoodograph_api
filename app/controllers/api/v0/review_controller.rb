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

	
	@reviews = Review.search limit, offset, api_key, parameters
	render 
	
end

def create
	review = Review.create(review_params)
	render nothing: true
end

def show
	@review = Review.find(params["id"])
	render
end

def update
	review = Review.find(params["id"])
	review.update(review_params)
	render :show
end

def destroy
	review = Review.find(params["id"])
	review.destroy
	render nothing: true
end

private

def review_params
	parameters = params.permit(:img, :full_review, :restaurant_id, :rating)
	parameters[:user_id] = User.find_by(session[:api_key]).id
	return parameters
end

end