module Api
  module V1
    class SpecificationsController < ApplicationController
      # GET /api/v1/specifications
      def index
        specifications = Specification.all
        response = specifications.map do |specification|
          specification_response(specification)
        end
        render json: response
      end

      def create
        specification = Specification.create(
          name: params[:name], status: params[:status], construction_method: params[:constructionMethod],
          amount: params[:amount], employee_id: params[:employee]
        )
        render json: specification_response(specification)
      end

      def destroy
        specification = Specification.find(params[:id])
        specification.destroy
      end

      def update
        specification = Specification.find(params[:id])
        specification.update(
          name: params[:name], status: params[:status], construction_method: params[:constructionMethod],
          amount: params[:amount], employee_id: params[:employee]
        )
        render json: specification_response(specification)
      end

      # GET	/api/v1/specifications/:id
      # HACK: 仕様書一覧と仕様書アイテム一覧の両方で用いているが、本来は分離するべき
      #       (仕様書一覧にはspecification_itemsが必要ない)
      def show
        specification = Specification.find(params[:id])

        # HACK: controllerではなくSerializerに書くべき内容
        specification_items = specification.specification_items.map { |item| 
          {
            id: item.id, name: item.name, type: item.specification_type, product_name: item.product&.name,
            maker: item.product&.maker, color_name: item.color&.name, customize: item.customize
          }
        }
        response = {
          name: specification.name,
          status: specification.status,
          constructionMethod: specification.construction_method,
          amount: specification.amount,
          employee: specification.employee_id,
          specification_items: specification_items,
        }
        render json: response
      end

      def specification_response(specification)
        {
          id: specification.id, name: specification.name,
          updated_at: specification.updated_at.strftime("%Y.%m.%d"),
          status: specification.status, constructionMethod: specification.construction_method,
          amount: specification.amount, employee: specification.employee
        }
      end
    end
  end
end
