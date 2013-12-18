Livaloud::Application.routes.draw do
  get "user_goals/index"
  get "user_goals/new"
  get "user_goals/show"
  get "user_goals/edit"
  resources :users, only: [:new, :create]

  resource :session, only: %w(new create destroy)

  root "users#index"
  resources :goals
end
