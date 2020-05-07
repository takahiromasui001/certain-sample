module Api
  module V1
    class SpecificationItemsController < ApplicationController
      # POST /api/v1/specification_items(.:format)
      def create
        specification = Specification.find(params[:specificationId])
        specification.specification_items.create(
          name: params[:name],
          specification_type: params[:type].to_i,
          product_id: params[:productId],
        )
      end
    end
    #   def destroy
    #     product = Product.find(params[:id])
    #     product.destroy
    #   end

    #   def show
    #     product = Product.find(params[:id])
    #     render json: product
    #   end

    #   def update
    #     product = Product.find(params[:id])
    #     product.update(name: params[:name], maker: params[:maker], price: params[:price])
    #   end
    # end
  end
end
