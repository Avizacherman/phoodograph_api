module Search

  def search limit, offset, *queries
    
   
    queries.flatten!
    data = Review.all

    queries.each do |query|
      query.each do |key, value|
        case key
        when :hashtags
            value = value.downcase
           data = data.where.contains(key => [value])
        when :rating
          data = data.where(key => value)
        when :username
			data = data.where(:user_id => User.find_by(key => value).id)        
		end
        
      end
    end
    return data.limit(limit).offset(offset)
  end
end

class Review < ActiveRecord::Base
  belongs_to :restaurant
  belongs_to :user
  before_save :populate_hashtags
  before_save :create_s3_association
  after_save :update_restaurant_rating


  def create_s3_association

    img = self.image
    s3_object = PhoodographyBucket.object("img-#{SecureRandom.uuid}.jpg")
    s3_object.put(body: img, content_type: "image/jpg")
    self.image = s3_object.public_url
  end

  def populate_hashtags
    hash_array = self.full_review.scan(/#\w+/).to_a
    hash_array.each do |hashed| 
    	hashed.gsub!('#', '').downcase!
    end
    self.hashtags = hash_array
  end

  def update_restaurant_rating
    total_score = 0
    self.restaurant.reviews.each do |review|
      total_score += review.rating
    end
    average_score = total_score/self.restaurant.reviews.count
    self.restaurant.update(:average_rating => average_score)
  end

  extend Search

end
