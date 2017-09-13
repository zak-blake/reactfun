Rails.application.routes.draw do

  resources :workspaces do
    get :lists, on: :member, to: 'lists#index'
  end
  resources :list_items
  resources :lists do
    get :items, on: :member, to: 'list_items#index'
  end

  devise_for :users
  root 'home_pages#home'
end
