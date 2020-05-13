module Api
  module V1
    class SpecificationItemsController < ApplicationController
      # POST /api/v1/specification_items(.:format)
      def create
        specification = Specification.find(params[:specificationId])
        item = specification.specification_items.create(
          name: params[:name],
          specification_type: params[:type].to_i,
          product_id: params[:productId],
        )
        render json: { 
          id: item.id, name: item.name, type: item.specification_type,
          product_name: item.product.name, maker: item.product.maker
        }
      end

      def destroy
        specification_item = SpecificationItem.find(params[:id])
        specification_item.destroy
      end

      def show
        specification_item = SpecificationItem.find(params[:id])
        render json: specification_item
      end

      def update
        item = SpecificationItem.find(params[:id])
        item.update(name: params[:name], specification_type: params[:type].to_i, product_id: params[:productId])
        render json: {
          id: item.id, name: item.name, type: item.specification_type,
          product_name: item.product.name, maker: item.product.maker
        }
      end
    end
  end
end
