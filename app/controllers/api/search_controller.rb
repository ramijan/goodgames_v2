class Api::SearchController < ApplicationController

  def search
    @results = GiantBomb.search(params[:query])
    render json: @results
  end

end