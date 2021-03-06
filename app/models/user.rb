class User < ActiveRecord::Base

  has_many :reviews

  has_many :user_game_links
  has_many :games, through: :user_game_links

  validates :username, 
              presence: true, 
              uniqueness: { case_sensitive: false }, 
              length: { minimum: 6 }
  
  validates :email, 
              presence: true,
              uniqueness: { case_sensitive: false }, 
              format: { with: /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}\b/ }

  validates :password,
              length: { minimum: 5 }

  has_secure_password
end
