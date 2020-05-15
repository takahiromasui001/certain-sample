module Api
  module V1
    class EmployeesController < ApplicationController
      # GET	/api/v1/employees
      def index
        employees = Employee.all
        response = employees.map do |employee|
          build_response(employee)
        end
        render json: response
      end

      private

      def build_response(product)
        {
          id: product.id, name: product.name
        }
      end
    end
  end
end
