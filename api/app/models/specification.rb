class Specification < ApplicationRecord
  has_many :specification_items
  belongs_to :employee

  enum status: { consultation: 0, provisional: 1, contract: 2, start: 3, completion: 4, finished: 5 }
  enum construction_method: { conventional: 0, two_by_four: 1 }
end
