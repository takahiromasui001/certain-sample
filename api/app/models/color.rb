class Color < ApplicationRecord
  belongs_to :product, optional: true
end
