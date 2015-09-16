
json.restaurants @restaurants do |restaurant|
	json.name restaurant.name
	json.id restaurant.id
	json.categories restaurant.categories
	json.geodata do
		json.lat restaurant.lat
		json.lng restaurant.lng
	end


	json.recent_review restaurant.reviews do |review|
		if review.id  == restaurant.reviews.length - 1
		json.date review.user.name
		end
	end

end