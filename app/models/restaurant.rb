module SearchFunction

  def search radius, limit, *queries
  	queries.flatten!
    data = Restaurant.includes(:reviews).all
    queries.each do |query|

      query.each do |key, value|
        case key
	        when :location
	          data = data.within(radius, :origin => [value[:lat], value[:lng]]).all
	        when :category
	        	data = data.where.contains(:categories => [value])
        end
      end
    end
    binding.pry
    return data.limit(limit)

  end
end


class Restaurant < ActiveRecord::Base
  has_many :reviews, dependent: :destroy
  acts_as_mappable

  extend SearchFunction

end