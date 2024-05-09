Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      namespace :block_starter do
        resources :projects, only: [:create, :show, :update, :destroy]
      end
    end
  end
end