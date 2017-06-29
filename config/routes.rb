Rails.application.routes.draw do
  resources :users, only: [] do
    collection do
      get :search
    end
  end

  namespace :api, { format: 'json' } do
    resources :messages, only: [:index, :create]
    resources :friendships, only: [:create, :destroy]
    resources :users, only: [:index] do
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

end
