class RenamePlaces < ActiveRecord::Migration
  def change
  	rename_table :places, :restaurants
  end
end
