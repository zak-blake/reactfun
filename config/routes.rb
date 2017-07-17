Rails.application.routes.draw do
  resources :lists
  devise_for :users
  root 'home_pages#home'
end
