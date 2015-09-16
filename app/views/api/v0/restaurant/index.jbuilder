review_id_offset = 0

json.restaurants @restaurants do |restaurant|
	json.name restaurant.name
	json.id restaurant.id
	json.categories restaurant.categories
	json.geodata do
		json.lat restaurant.lat
		json.lng restaurant.lng
	end
	


	json.most_recent_review restaurant.reviews do |review|


		if review.id - review_id_offset  == restaurant.reviews.length

		json.user review.user.username
		json.full_review review.full_review
		json.hashtags review.hashtags
		json.rating review.rating
		json.date review.created_at
		review_id_offset += restaurant.reviews.length
		end
	end

end