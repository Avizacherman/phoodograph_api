module RestaurantSearch

  def search radius, limit, api_key, *queries
    
    if(!User.find_by(:api_key => api_key))
      return "Invalid API Key"
    end

    queries.flatten!
    data = Restaurant.all.includes(:reviews)

    
    queries.each do |query|

      query.each do |key, value|
        case key
          when :location
            data = data.within(radius, :origin => [value[:lat], value[:lng]]).all
          when :category
            data = data.where.contains(:categories => [value])
          when :name
            data = data.search_by_name(value)
          when :rating
            data = data.where "average_rating >= ?", value
        end
      end
    end
    return data.limit(limit)

  end
end

class Restaurant < ActiveRecord::Base
  has_many :reviews, dependent: :destroy
  include PgSearch
  pg_search_scope :search_by_name, 
    :against => :name, 
    :using => {
      :tsearch => {:prefix => :true}
    }
  acts_as_mappable


  extend RestaurantSearch



end
