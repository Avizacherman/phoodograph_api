class AddFullReview < ActiveRecord::Migration
  def change
  	add_column :reviews, :full_review, :text
  	add_index :reviews, :hashtags, using: :gin
  end
end
