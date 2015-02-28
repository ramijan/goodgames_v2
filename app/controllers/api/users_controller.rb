class Api::UsersController < ApplicationController

  def show
    render json: (current_user ? current_user : nil), 
      except: :password_digest,
      include: [:user_game_links, :reviews, :games => {only: [:giant_bomb_id, :thumb_image]}]
  end


end