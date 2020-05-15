class Specification < ApplicationRecord
  has_many :specification_items

  enum status: { start: 0, completed: 1 }
  enum construction_method: { conventional: 0, two_by_four: 1 }
end
