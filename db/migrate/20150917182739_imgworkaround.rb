class Imgworkaround < ActiveRecord::Migration
  def change
  	rename_column :reviews, :img_url, :img
  end
end
