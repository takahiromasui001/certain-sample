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

      def show
        product = Product.find(params[:id])
        render json: product
      end

      def update
        product = Product.find(params[:id])
        product.update(name: params[:name], maker: params[:maker], price: params[:price])
      end
    end
  end
end
