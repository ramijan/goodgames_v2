class Api::UserGameLinksController < ApplicationController

  def create

    if current_user
      link = UserGameLink.new(link_params)
      link.user = current_user

      if link.save
        render json: link, status: 200
      else
        render json: {errors: link.errors}, status: 400
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