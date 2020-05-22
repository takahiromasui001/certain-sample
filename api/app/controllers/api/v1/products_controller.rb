module Api
  module V1
    class ProductsController < ApplicationController
      # GET	/api/v1/products
      def index
        products = Product.all
        response = products.map do |product|
          build_response(product)
        end
        render json: response
      end

      # POST /api/v1/products
      def create
        product = Product.create(name: params[:name], maker: params[:maker], price: params[:price])
        render json: build_response(product)
      end

      # DELETE /api/v1/products/:id(.:format)
      def destroy
        product = Product.find(params[:id])
        product.destroy
      end

      # GET /api/v1/products/:id
      def show
        product = Product.find(params[:id])
        render json: build_response(product)
      end

      # PATCH /api/v1/products/:id
      def update
        product = Product.find(params[:id])
        product.update(name: params[:name], maker: params[:maker], price: params[:price])
        render json: build_response(product)
      end

      def colors
        product = Product.find(params[:id])
        colors = product.colors
        render json: colors.map{ |color| { color: color.name }}
      end

      private

      def build_response(product)
        {
          id: product.id, name: product.name, maker: product.maker, price: product.price
        }
      end
    end
  end
end
