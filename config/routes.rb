Rails.application.routes.draw do

  # Root is the angular app
  root 'application#index'

  namespace :api do

    # session routes for login and logout
    post '/login' => 'sessions#create'
    delete '/logout' => 'sessions#destroy'

    # user routes for sign up and to validate current user
    post '/signup' => 'users#create'
    get '/currentuser' => 'users#show'

    # search route for giant bomb api search
    get '/search' => 'search#search'

    # games show and index to get games.  Create is handled inside of show
    get '/games/:id' => 'games#show'
    get '/games' => 'games#index'

    # user-game links (tracks relationships between users and games and also shelves)
    post '/links' => 'user_game_links#create'
    put '/links/:id' => 'user_game_links#update'
    get '/links' => 'user_game_links#index'

    # review routes (tracks rating and reviews)
    get '/reviews/user' => 'reviews#user_index'
    get '/review/:game_id' => 'reviews#show'
    get '/reviews/:game_id' => 'reviews#index'
    get '/recentreviews' => 'reviews#recent'
    post '/reviews' => 'reviews#create'
    put '/reviews/:id' => 'reviews#update'

  end
end
