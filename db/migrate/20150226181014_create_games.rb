class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.string :name
      t.text :deck
      t.integer :giant_bomb_id
      t.string :thumb_image
      t.string :medium_image
      t.integer :expected_release_year
      t.integer :expected_release_day
      t.integer :expected_release_month
      t.integer :expected_release_quarter
      t.datetime :original_release_date
      t.text :platforms, array: true, default: []
      t.text :developers, array: true, default: []
      t.text :franchises, array: true, default: []
      t.text :genres, array: true, default: []
      t.text :publishers, array: true, default: []

      t.timestamps null: false
    end
  end
end
