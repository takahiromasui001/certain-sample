class CreateCandidateProducts < ActiveRecord::Migration[6.0]
  def change
    create_table :candidate_products do |t|
      t.references :specification_item, null: false, foreign_key: true
      t.references :product, null: false, foreign_key: true
    end
  end
end
