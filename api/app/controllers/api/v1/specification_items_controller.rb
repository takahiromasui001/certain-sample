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

      def destroy
        specification_item = SpecificationItem.find(params[:id])
        specification_item.destroy
      end

      def show
        specification_item = SpecificationItem.find(params[:id])
        render json: specification_item
      end

      def update
        specification_item = SpecificationItem.find(params[:id])
        specification_item.update(name: params[:name], specification_type: params[:type], product_id: params[:productId])
      end
    end
  end
end
