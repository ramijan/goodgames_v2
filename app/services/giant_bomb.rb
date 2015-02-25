class GiantBomb

  def self.search(query)

    return {} if (query == nil || query.match(/^\s*$/))

    response = HTTParty.get( giant_bomb_search_url, query: {
                api_key: ENV['GB_KEY'],
                format: 'json',
                resources: 'game',
                field_list: 'api_detail_url,deck,expected_release_year,image,name,original_release_date,platforms',
                query: "#{query}"
               } ).parsed_response

    response['status_code'] == 1 ? response : {}

  end


  def self.game(game_id)
    
    return {} if (game_id == nil || game_id.match(/^\s*$/))

    response = HTTParty.get( giant_bomb_game_url(game_id), query: {
                api_key: ENV['GB_KEY'],
                format: 'json',
               } ).parsed_response

    response['status_code'] == 1 ? response : {}

  end


private

  def self.giant_bomb_search_url
    "http://www.giantbomb.com/api/search/"
  end

  def self.giant_bomb_game_url(game_id)
    "http://www.giantbomb.com/api/game/#{game_id}/"
  end

end