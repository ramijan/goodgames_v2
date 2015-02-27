class Api::GamesController < ApplicationController

  def show
    game = Game.find_by(giant_bomb_id: params[:id])

    if game && current_user && game.users.include?(current_user)
      link = UserGameLink.find_by(game_id: game.id, user_id: current_user.id)
      # review = game.reviews.find_by(user_id: current_user.id)
    end

    # if game
    #   reviews = game.reviews.includes(:user)
    # end

    if game.nil?
      data = GiantBomb.game(params[:id])['results']
      game = Game.new(
        name: data['name'],
        deck: data['deck'],
        giant_bomb_id: data['id'],
        thumb_image: data['image'] ? data['image']['thumb_url'] : nil,
        medium_image: data['image'] ? data['image']['medium_url'] : nil,
        expected_release_year: data['expected_release_year'],
        expected_release_day: data['expected_release_day'],
        expected_release_month: data['expected_release_month'],
        expected_release_quarter: data['expected_release_quarter'],
        original_release_date: data['original_release_date'],
      )
      
      if data['platforms']
        data['platforms'].each do |platform|
          game.platforms << platform['name']
        end
      end

      if data['developers']
        data['developers'].each do |developer|
          game.developers << developer['name']
        end
      end 

      if data['franchises']
        data['franchises'].each do |franchise|
          game.franchises << franchise['name']
        end
      end

      if data['genres']
        data['genres'].each do |genre|
          game.genres << genre['name']
        end
      end

      if data['publishers']
        data['publishers'].each do |publisher|
          game.publishers << publisher['name']
        end
      end

      game.save
    end

    link_count = game.users.count

    render json: {game: game, link: link, link_count: link_count} #, reviews: reviews, review: review}

  end


end