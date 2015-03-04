class Api::UserGameLinksController < ApplicationController

  def index
    links = UserGameLink.includes(:user, :game).order('updated_at desc').limit(20)
    render json: links, only: [:shelf, :updated_at, :created_at], 
                        include: {
                          user: {only: :username},
                          game: {only: [:name, :thumb_image, :giant_bomb_id]}
                        }
  end

  def create

    if current_user
      link = UserGameLink.new(link_params)
      link.user = current_user

      if link.save
        render json: link, status: 200
      else
        render json: {errors: link.errors}
      end
    else
      render json: {shelf: nil, errors: ["User not logged in"]}
    end
  end

  def update
    link = UserGameLink.find(params[:id])

    if link.update(link_params)
      render json: link, status: 200
    else
      render json: {errors: link.errors}, status: 400
    end

  end

private
  
  def link_params
    params.require(:user_game_link).permit(:shelf, :platforms, :user_id, :game_id)
  end

end