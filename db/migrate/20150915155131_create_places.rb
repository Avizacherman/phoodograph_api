class CreatePlaces < ActiveRecord::Migration

  def change
    create_table :places do |t|
      t.string :g_places_id
      t.string :categories, array: true, default: []
      t.string :name

      t.timestamps null: false
    end
  end
end
