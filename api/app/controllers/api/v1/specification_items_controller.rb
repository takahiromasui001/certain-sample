module Api
  module V1
    class SpecificationItemsController < ApplicationController
      # POST /api/v1/specification_items(.:format)
      def create
        specification = Specification.find(params[:specificationId])
        item = specification.specification_items.create(
          name: params[:name],
          specification_type: params[:type],
          product_id: params[:productId],
          color_id: params[:colorId],
        )
        render json: build_response(item)
      end

      def destroy
        specification_item = SpecificationItem.find(params[:id])
        specification_item.destroy
      end

      def show
        specification_item = SpecificationItem.find(params[:id])
        attributes = specification_item.attributes.merge({candidates: specification_item.candidates.ids})
        render json: attributes
      end

      def update
        item = SpecificationItem.find(params[:id])
        item.update(
          name: params[:name], specification_type: params[:type], 
          product_id: params[:productId], color_id: params[:colorId]
        )

        new_candidate_instances, delete_candidate_ids = createCandidateIds(item)
        CandidateProduct.import(new_candidate_instances)
        CandidateProduct.destroy(delete_candidate_ids)

        render json: build_response(item)
      end

      private

      def createCandidateIds(item)
        current_candidate_ids = item.candidates.ids
        next_candidate_ids = params[:productCandidate]

        new_candidate_ids = next_candidate_ids.filter { |i| current_candidate_ids.exclude?(i) }
        new_candidate_instances = []
        new_candidate_ids.each { |i| new_candidate_instances << item.candidate_products.build(product_id: i) }

        delete_product_ids = current_candidate_ids.filter { |i| next_candidate_ids.exclude?(i) }
        delete_candidate_ids = CandidateProduct.where(product_id: delete_product_ids).ids

        [new_candidate_instances, delete_candidate_ids]
      end

      def build_response(item)
        {
          id: item.id, name: item.name, type: item.specification_type,
          product_name: item.product&.name, maker: item.product&.maker, color_name: item.color&.name
        }
      end
    end
  end
end
