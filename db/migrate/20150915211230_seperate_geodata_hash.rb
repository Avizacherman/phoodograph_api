class SeperateGeodataHash < ActiveRecord::Migration
  def change
  	remove_column :restaurants, :geodata
  	add_column :restaurants, :lat, :float
  	add_column :restaurants, :lng, :float
  end
end
