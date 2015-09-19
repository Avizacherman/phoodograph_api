
json.restaurants @restaurants do |restaurant|
	json.name restaurant.name
	json.id restaurant.id
	json.categories restaurant.categories
	json.geodata do
		json.lat restaurant.lat
		json.lng restaurant.lng
	end
	


	json.most_recent_review  do 


		
		json.user restaurant.reviews.last.user.username
		json.full_review restaurant.reviews.last.full_review
		json.hashtags restaurant.reviews.last.hashtags
		json.rating restaurant.reviews.last.rating
		json.date restaurant.reviews.last.created_at
		json.img_url restaurant.reviews.last.image
	end

end