class CandidateProduct < ApplicationRecord
  belongs_to :specification_item
  belongs_to :product
end
