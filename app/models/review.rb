module Search

  def search limit, offset, *queries
    queries.flatten!
    data = Review.all

    queries.each do |query|
      query.each do |key, value|
        case key
        when :hashtags
          data = data.where.contains(key => [value.downcase!])
        when :rating
          data = data.where(key => value)
        end
        
      end
    end
    return data.limit(limit).offset(offset)
  end
end

class Review < ActiveRecord::Base
  belongs_to :place
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