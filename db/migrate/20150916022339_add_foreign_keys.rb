class AddForeignKeys < ActiveRecord::Migration
  def change
  	add_foreign_key :reviews, :restaurants
  	add_foreign_key :reviews, :users

  	add_index :reviews, :restaurant_id
  	add_index :reviews, :user_id
  end
end
