Rails.application.routes.draw do
  root 'home_pages#home'
  devise_for :users

  resources :users do
    resources :workspaces do
      resources :lists do
        resources :list_items
      end
    end
  end
end
