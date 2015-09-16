module Search

  def search limit, offset, api_key, *queries
    
    if(!User.find_by(:api_key => api_key))
    	return "Invalid API Key"
    end

    queries.flatten!
    data = Review.all

    queries.each do |query|
      query.each do |key, value|
        case key
        when :hashtags
           data = data.where.contains(key => [value.downcase!])
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

  def populate_hashtags
    hash_array = self.full_review.scan(/#\w+/).to_a
    hash_array.each do |hashed| 
    	hashed.gsub!('#', '').downcase!
    end
    self.hashtags = hash_array
  end

  extend Search

end
