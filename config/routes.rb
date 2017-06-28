Rails.application.routes.draw do
  # get 'messages/new'
  # get 'users/new'
  get 'users/search'

  namespace :api, { format: 'json' } do
    resources :messages
    resources :friendships
    resources :users do
      collection do
        get :search
      end
    end
  end

  devise_for :users
  devise_scope :user do
    authenticated :user do
      root to: 'messages#index', as: 'authenticated_root'
    end
    unauthenticated :user do
      root to: 'devise/sessions#new', as: 'unauthenticated_root'
    end
  end

  resources :messages
  resources :users
end
