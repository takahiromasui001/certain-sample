module Api
  module V1
    class SpecificationsController < ApplicationController
      # GET /api/v1/specifications
      def index
        specifications = Specification.all
        response = specifications.map do |specification|
          { id: specification.id, name: specification.name, updated_at: specification.updated_at.strftime("%Y年%m月%d日 %H:%M:%S") }
        end
        render json: response
      end

      def create
        specification = Specification.create(name: params[:name])
        response = { id: specification.id, name: specification.name, updated_at: specification.updated_at.strftime("%Y年%m月%d日 %H:%M:%S") }
        render json: response
      end

      def destroy
        specification = Specification.find(params[:id])
        specification.destroy
      end

      def update
        specification = Specification.find(params[:id])
        specification.update(name: params[:name])
        response = { id: specification.id, name: specification.name, updated_at: specification.updated_at.strftime("%Y年%m月%d日 %H:%M:%S") }
        render json: response
      end

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
