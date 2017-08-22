class ListItem < ApplicationRecord
  belongs_to :list
  enum status: { incomplete: 0, complete: 1 }

  validates_presence_of :name, :status
end
