class Game < ActiveRecord::Base

  has_many :user_game_links
  has_many :users, through: :user_game_links


end
