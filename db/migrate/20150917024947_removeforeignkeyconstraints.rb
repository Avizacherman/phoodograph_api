class Removeforeignkeyconstraints < ActiveRecord::Migration
  def change
		remove_foreign_key :reviews, :restaurants
  	remove_foreign_key :reviews, :users

  	remove_index :reviews, :restaurant_id
  	remove_index :reviews, :user_id
  end
end
