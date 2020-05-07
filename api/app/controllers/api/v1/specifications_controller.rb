module Api
  module V1
    class SpecificationsController < ApplicationController
      # GET	/api/v1/specifications/:id
      def show
        specification = Specification.find(params[:id])

        # HACK: controllerではなくSerializerに書くべき内容
        specification_items = specification.specification_items.map { |item| 
          {
            id: item.id, name: item.name, type: item.specification_type, product_name: item.product.name, maker: item.product.maker
          }
        }
        response = {
          name: specification.name,
          specification_items: specification_items
        }
        render json: response
      end
    end
  end
end
