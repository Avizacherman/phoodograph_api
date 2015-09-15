class Api::V0::Restaurant::RestaurantController < ApplicationController 
	def index
		restaurants = Restaurant.limit(10)
		render json: {data: restaurants}
	end
end