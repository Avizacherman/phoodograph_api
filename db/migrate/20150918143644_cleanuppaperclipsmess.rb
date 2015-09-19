class Cleanuppaperclipsmess < ActiveRecord::Migration
  def change
  	remove_attachment :reviews, :image
  	add_column :reviews, :image, :string
  end
end
