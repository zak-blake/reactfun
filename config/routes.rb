Rails.application.routes.draw do
  root 'home_pages#home'
  devise_for :users

  resources :users do
    resources :workspaces do
      # get :lists, on: :member, to] 'lists#index'
      resources :lists do
        # get :items, on: :member, to: 'list_items#index'
        resources :list_items
      end
    end
  end
end
