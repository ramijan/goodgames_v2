class Api::GamesController < ApplicationController

  def show
    game = Game.find_by(giant_bomb_id: params[:id])

    if game.nil?
      data = GiantBomb.game(params[:id])['results']
      game = Game.new(
        name: data['name'],
        deck: data['deck'],
        giant_bomb_id: data['id'],
        thumb_image: data['image']['thumb_url'],
        medium_image: data['image']['medium_url'],
        expected_release_year: data['expected_release_year'],
        expected_release_day: data['expected_release_day'],
        expected_release_month: data['expected_release_month'],
        expected_release_quarter: data['expected_release_quarter'],
        original_release_date: data['original_release_date'],
      )
      
      data['platforms'].each do |platform|
        game.platforms << platform['name']
      end
      data['developers'].each do |developer|
        game.developers << developer['name']
      end
      data['franchises'].each do |franchise|
        game.franchises << franchise['name']
      end
      data['genres'].each do |genre|
        game.genres << genre['name']
      end
      data['publishers'].each do |publisher|
        game.publishers << publisher['name']
      end

      game.save
    end

    render json: game

  end


end