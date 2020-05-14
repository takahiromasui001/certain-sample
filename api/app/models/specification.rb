class Specification < ApplicationRecord
  has_many :specification_items

  enum status: { start: 0, completed: 1 }
  enum construction_method: { conventional: 0 }
end
