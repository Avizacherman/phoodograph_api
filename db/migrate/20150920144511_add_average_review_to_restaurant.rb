class AddAverageReviewToRestaurant < ActiveRecord::Migration
  def change
  	add_column :restaurants, :average_rating, :float, :precision => 2
  end
end
