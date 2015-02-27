class UserGameLinksController < ApplicationController

  def show
    link = UserGameLink.find_by(user_id: params[:user_id], game_id: params[:game_id])
    render json: link
  end

  def game_index
    links = UserGameLink.where(game_id: params[:game_id])
    render json: links
  end

  def user_index
    links = current_user ? UserGameLink.where(user_id: current_user) : {}
    render json: links
  end

  def create
    link = UserGameLink.new(link_params)
    link.user_id = params[:user_id]
    link.game_id = params[:game_id]

    if link.save
      render json: link, status: 200
    else
      render json: {errors: link.errors}, status: 400
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
    params.require(:user_game_link).permit(:shelf, :platforms, :rating, :review)
  end

end