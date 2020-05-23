class AddColorsIdColumnToSpecificationTable < ActiveRecord::Migration[6.0]
  def change
    change_table :specification_items do |t|
      t.references :color, index: true, foreign_key: true
    end
  end
end
