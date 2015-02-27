class CreateUserGameLinks < ActiveRecord::Migration
  def change
    create_table :user_game_links do |t|
      t.references :user, index: true
      t.references :game, index: true
      t.string :shelf
      t.text :platforms, array: true, default: []
      t.integer :rating
      t.text :review

      t.timestamps null: false
    end
    add_foreign_key :user_game_links, :users
    add_foreign_key :user_game_links, :games
  end
end
