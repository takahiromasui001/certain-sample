class SpecificationItem < ApplicationRecord
  belongs_to :specification
  belongs_to :product, optional: true
  belongs_to :color, optional: true

  enum specification_type: { inner: 0, outer: 1, inner_finishing: 2, equipment: 3 }
end
