class Product < ApplicationRecord
  has_many :specification_items
  has_many :colors
  has_many :candidate_products
end
