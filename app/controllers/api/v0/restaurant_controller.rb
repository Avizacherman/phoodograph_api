class Api::V0::RestaurantController < ApplicationController
 
	def index
		radius = params["radius"] ? params["radius"].to_i : 5
		limit = params["limit"] ? params["limit"].to_i : 10

		parameters = [] 
		if params["location"]
			geodata = params["location"].split(",")
			parameters << {:location => {:lat => geodata[0].to_f, :lng => geodata[1].to_f}}
		end

		if params["category"]
			parameters << {:category => params["category"]}
		end

		if params["name"]
			parameters << {:name => params["name"]}
		end

		restaurants = Restaurant.search radius, limit, params["api_key"], parameters 
		render json: {data: restaurants}
	end

	def show
		restaurant = Restaurant.find(params["id"])
		render json: {data: restaurant}
	end

	def create
		restaurant = Restaurant.create(restaurant_params)
		render json: {data: restaurant}
	end

	def update
		restaurant = Restaurant.find(params["id"])
		restaurant.update(restaurant_params)
		render json: {data: restaurant}
	end

	def destroy
		restaurant = Restaurant.find(params["id"])
		restaurant.destroy
		render nothing: true
	end

private 

	def restaurant_params
		params.require(:restaurant).permit(:lat, :lng, :name, :categories)
	end

end
