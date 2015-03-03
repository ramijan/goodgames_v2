Rails.application.routes.draw do

  root 'application#index'

  get '/signup' => 'users#new'


  # get '/login' => 'sessions#new'
  # post '/login' => 'sessions#create'
  # get '/logout' => 'sessions#destroy'


  namespace :api do

    post '/login' => 'sessions#create'
    delete '/logout' => 'sessions#destroy'

    post '/signup' => 'users#create'
    
    get '/currentuser' => 'users#show'

    get '/search' => 'search#search'
    get '/games/:id' => 'games#show'
    get '/games' => 'games#index'

    post '/links' => 'user_game_links#create'
    put '/links/:id' => 'user_game_links#update'

    get '/reviews/user' => 'reviews#user_index'
    get '/review/:game_id' => 'reviews#show'
    get '/reviews/:game_id' => 'reviews#index'
    post '/reviews' => 'reviews#create'
    put '/reviews/:id' => 'reviews#update'

  end


end