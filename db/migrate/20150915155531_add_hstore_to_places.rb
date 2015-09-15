class AddHstoreToPlaces < ActiveRecord::Schema
  def change
    enable_extension "hstore"
    add_column :places, :geodata, :hstore
    add_index :places, :geodata, using: :gin
  end
end
