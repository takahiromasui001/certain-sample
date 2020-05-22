class Product < ApplicationRecord
  has_many :specification_items
  has_many :colors
end
