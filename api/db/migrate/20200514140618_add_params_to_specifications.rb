class AddParamsToSpecifications < ActiveRecord::Migration[6.0]
  def change
    add_column :specifications, :status, :integer
    add_column :specifications, :amount, :integer
    add_column :specifications, :construction_method, :integer
  end
end
