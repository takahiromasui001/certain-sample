module Api
  module V1
    class ProductsController < ApplicationController
      # GET	/api/v1/products
      def index
        products = Product.all
        render json: products
      end

      # POST /api/v1/products
      def create
        Product.create(name: params[:name], maker: params[:maker], price: params[:price])
      end

      # DELETE /api/v1/products/:id(.:format)
      def destroy
        product = Product.find(params[:id])
        product.destroy
      end

      # GET /api/v1/products/:id
      def show
        product = Product.find(params[:id])
        render json: product
      end

      # PATCH /api/v1/products/:id
      def update
        product = Product.find(params[:id])
        product.update(name: params[:name], maker: params[:maker], price: params[:price])
      end
    end
  end
end
