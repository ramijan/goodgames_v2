class Api::SearchController < ApplicationController

  def search
    # get search results from Giant Bomb api
    results = GiantBomb.search(params[:query])

    # grab any results that are already in database
    gb_ids = results['results'].map {|r| r['id']}
    games = Game.where(giant_bomb_id: gb_ids).includes(:reviews)
    
    # grab ratings for games in database
    reviews = []
    games.each do |game|
      reviews << game.reviews
    end

    results['games'] = games
    results['reviews'] = reviews
    render json: results
  end

end