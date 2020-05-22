class CreateProductsColors < ActiveRecord::Migration[6.0]
  def change
    change_table :colors do |t|
      t.references :product,  index: true, foreign_key: true
    end
  end
end
