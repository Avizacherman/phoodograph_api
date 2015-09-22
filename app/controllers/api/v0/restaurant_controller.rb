class Api::V0::RestaurantController < ApplicationController
 
	def index
		radius = params["radius"] ? params["radius"].to_i : 5
		limit = params["limit"] ? params["limit"].to_i : 10

		parameters = [] 
		if params["location"]
			geodata = params["location"].split(",")
			parameters << {:location => {:lat => geodata[0].to_f, :lng => geodata[1].to_f}}
		end

		if params["categories"]
			parameters << {:category => params["categories"]}
		end

		if params["name"]
			parameters << {:name => params["name"]}
		end

		if params["rating"]
			parameters << {:rating => params["rating"]}
		end
		
		@restaurants = Restaurant.search radius, limit, parameters 
		render
	end

	def show
		@restaurant = Restaurant.find(params["id"])
		render
	end

	def create
		api_key = session[:api_key]
		if(User.find_by api_key) 
			restaurant = Restaurant.create(restaurant_params)
			render json: {data: restaurant}
		else 
			render json: {error: "You are not logged in"}
		end
	end

	def update
		api_key = session[:api_key]
		if(User.find_by api_key) 
			restaurant = Restaurant.find(params["id"])
			restaurant.update(restaurant_params)
			render json: {data: restaurant}
		else 
			render json: {error: "You are not logged in"}
		end
		
	end

	def destroy
		api_key = session[:api_key]
		if(User.find_by api_key) 
			restaurant = Restaurant.find(params["id"])
			restaurant.destroy
			render nothing: true
		else 
			render json: {error: "You are not logged in"}
		end
		
	end

	def check_restaurants
		restaurant_name = params["name"]
		restaurant_pid = params["pid"]


		if Restaurant.find_by(:g_places_id => restaurant_pid) && restaurant_pid != nil
			render json: {:id => Restaurant.find_by(:g_places_id => restaurant_pid).id}
		 elsif Restaurant.find_by(:name => restaurant_name)
		 	render json: {:id => Restaurant.find_by(:name => restaurant_name).id}
		 else 
		 	render json: {:id => false}
		 end
		end


		

private 

	def restaurant_params
		params.require(:restaurant).permit(:lat, :lng, :name, :categories, :g_places_id)
	end

end
