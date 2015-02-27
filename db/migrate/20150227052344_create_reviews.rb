class CreateReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
      t.integer :rating
      t.text :text
      t.references :user, index: true
      t.references :game, index: true

      t.timestamps null: false
    end
    add_foreign_key :reviews, :users
    add_foreign_key :reviews, :games
  end
end
