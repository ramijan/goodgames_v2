class Api::ReviewsController < ApplicationController

  def show
    if current_user
      review = Review.find_by(game_id: params[:game_id], user_id: current_user.id)
      render json: review, include: {user: {only: [:username]}}
    else
      render json: {}
    end
  end

  def index
    reviews = Review.where(game_id: params[:game_id])
    render json: reviews, only: [:id, :rating, :text, :created_at], include: {user: {only: [:username]}}
  end


  def create
    if current_user
      review = Review.new(review_params)
      review.user = current_user
      if review.save
        render json: review, status: 200
      else
        render json: {errors: review.errors}, status: 400
      end
    else
      render json: {rating: nil, errors: ["User not logged in"]}
    end
  end

  def update
    review = Review.find(params[:id])

    if review.update(review_params)
      render json: review, status: 200
    else
      render json: {errors: review.errors}, status: 400     
    end

  end

private
  
  def review_params
    params.require(:review).permit(:rating, :text, :game_id)
  end

end