module Api
  module V1
    class ComponentsController < ApplicationController
      def index
        components = Component.all
        render json: components
      end
    end
  end
end
