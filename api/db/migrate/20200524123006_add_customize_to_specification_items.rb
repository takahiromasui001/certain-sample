class AddCustomizeToSpecificationItems < ActiveRecord::Migration[6.0]
  def change
    add_column :specification_items, :customize, :boolean, default: false, null: false
  end
end
