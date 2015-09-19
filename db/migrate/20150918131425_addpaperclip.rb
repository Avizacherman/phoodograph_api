class Addpaperclip < ActiveRecord::Migration
  def change
  	remove_column :reviews, :img
  end

  def up
    add_attachment :reviews, :image
  end

  def down
    remove_attachment :reviews, :image
  end

end
