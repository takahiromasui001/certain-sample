class Color < ApplicationRecord
  belongs_to :product, optional: true
  has_many :specification_items
end
