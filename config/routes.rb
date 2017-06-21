Rails.application.routes.draw do
  devise_for :users
  root 'messages#index'
  get 'messages/new'
  get 'users/new'
  get 'users/search'

  namespace :api, { format: 'json' } do
    resources :messages
    resources :users
  end

  resources :messages
  resources :users
end
