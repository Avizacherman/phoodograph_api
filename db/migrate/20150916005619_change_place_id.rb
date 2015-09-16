class ChangePlaceId < ActiveRecord::Migration
  def change
  	rename_column :reviews, :place_id, :restaurant_id
  end
end
