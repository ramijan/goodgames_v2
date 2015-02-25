Rails.application.routes.draw do

  root 'application#index'

  get '/signup' => 'users#new'
  post '/users' => 'users#create'


end