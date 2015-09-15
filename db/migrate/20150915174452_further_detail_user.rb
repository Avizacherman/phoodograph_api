class FurtherDetailUser < ActiveRecord::Migration
  def change
  	add_column :users, :hide_full_name, :boolean, default: false
  end
end
