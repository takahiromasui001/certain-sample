class CreateSpecificationItems < ActiveRecord::Migration[6.0]
  def change
    create_table :specification_items do |t|
      t.string :name
      t.integer :specification_type
      t.references :specification, foreign_key: true
      t.references :product, foreign_key: true

      t.timestamps
    end
  end
end
