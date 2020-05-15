Rails.application.routes.draw do
  get 'products/index'
  namespace 'api' do
    namespace 'v1' do
      resources :products, only: [:index, :create, :show, :update, :destroy]
      resources :specifications, only: [:index, :create, :show, :update, :destroy]
      resources :specification_items, only: [:index, :create, :show, :update, :destroy] 
      resources :employees, only: [:index] 
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
