
	json.id @review.id
	json.user @review.user.username
	json.place @review.restaurant.name
	json.rating @review.rating
	json.full_review @review.full_review
	json.hashtags @review.hashtags
	json.img_url @review.img
	json.date @review.created_at

