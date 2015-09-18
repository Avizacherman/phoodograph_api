class UseS3hosting < ActiveRecord::Migration
  def change
  	remove_column :reviews, :picture_data
  	add_column :reviews, :img_url, :string
  end
end
