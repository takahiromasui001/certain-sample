class AddReferenceFromSpecificationToEmployee < ActiveRecord::Migration[6.0]
  def change
    add_reference :specifications, :employee, foreign_key: true
  end
end
