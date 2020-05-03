module Api
  module V1
    class ProductsController < ApplicationController
      def index
        products = Product.all
        render json: products
      end

      def create
        Product.create(name: params[:name], maker: params[:maker], price: params[:price])
      end

      def destroy
        product = Product.find(params[:id])
        product.destroy
      end
    end    
  end
end
