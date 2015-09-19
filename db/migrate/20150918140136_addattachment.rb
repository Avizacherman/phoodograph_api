class Addattachment < ActiveRecord::Migration
  def change
  	add_attachment :reviews, :image
  end
end
