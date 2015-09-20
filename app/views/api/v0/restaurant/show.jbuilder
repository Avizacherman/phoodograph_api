	json.name @restaurant.name
	json.id @restaurant.id
	json.categories @restaurant.categories
	json.geodata do
		json.lat @restaurant.lat
		json.lng @restaurant.lng
	end
	json.reviews @restaurant.reviews do |review|

		json.user review.user.username
		json.full_review review.full_review
		json.hashtags review.hashtags
		json.rating review.rating
		json.img_url review.image
		json.date review.created_at
		
end