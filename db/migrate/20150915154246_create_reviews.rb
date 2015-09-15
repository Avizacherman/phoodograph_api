class CreateReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
      t.integer :place_id
      t.integer :user_id
      t.float :rating
      t.string :hashtags, array: true, default: []
      t.text :picture_data

      t.timestamps null: false
    end
  end
end
