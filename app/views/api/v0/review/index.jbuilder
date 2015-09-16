json.reviews @reviews do |review|
	json.id review.id
	json.user review.user.username
	json.place review.restaurant.name
	json.rating review.rating
	json.full_review review.full_review
	json.hashtags review.hashtags
	json.date review.created_at
end
