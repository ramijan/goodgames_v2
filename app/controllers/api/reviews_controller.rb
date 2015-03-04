class Api::ReviewsController < ApplicationController

  def show
    if current_user
      review = Review.find_by(game_id: params[:game_id], user_id: current_user.id)
      render json: review, include: {user: {only: [:username]}}
    else
      render json: {}
    end
  end

  def user_index
    if current_user
      reviews = current_user.reviews
      render json: reviews
    else
      render json: {}
    end
  end

  def index
    reviews = Review.where(game_id: params[:game_id])
    render json: reviews, only: [:id, :rating, :text, :created_at, :updated_at], include: {user: {only: [:username]}}
  end

  def recent
    reviews = Review.includes(:user, :game).order('updated_at desc').limit(20)
    render json: reviews, only: [:rating, :text, :updated_at, :created_at], 
                          include: {
                            user: {only: :username}, 
                            game: {only: [:name, :thumb_image, :giant_bomb_id]}
                          }
  end

  def create
    if current_user
      review = Review.new(review_params)
      review.user = current_user

      # add link if none exists (default to played shelf)
      link = UserGameLink.find_by(game_id: review['game_id'], user_id: current_user.id)
      if link.nil?
        UserGameLink.create(game_id: review['game_id'], user_id: current_user.id, shelf: 'played')
      end


      if review.save
        render json: review, status: 200
      else
        render json: {errors: review.errors}
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