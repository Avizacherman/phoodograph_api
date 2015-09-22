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
	if params["username"]
		parameters << {:username => params["username"]}
	end

	
	@reviews = Review.search limit, offset, parameters
	render 
	
end

def create
	api_key = session[:api_key]
	if(User.find_by(:api_key=> api_key)) 
		review = Review.create(review_params)
		render nothing: true
	else 
		render json: {error: "You are not logged in"}
	end
end

def show
	@review = Review.find(params["id"])
	render
end

def update
	api_key = session[:api_key]
	if(User.find_by(:api_key=> api_key)) 
		review = Review.find(params["id"])
		review.update(review_params)
	else
		render json: {error: "You are not logged in"}
	end	
	render :show
end

def destroy
	api_key = session[:api_key]
	if(User.find_by(:api_key=> api_key)) 
		review = Review.find(params["id"])
		review.destroy
		render nothing: true
	else
		render json: {error: "You are not logged in"}
	end	
end

private

def review_params
	parameters = params.permit(:image, :full_review, :restaurant_id, :rating)
  parameters[:image] = parameters[:image].read
	parameters[:user_id] = User.find_by(:api_key => session[:api_key]).id
	return parameters
end

end