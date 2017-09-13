class List < ApplicationRecord
  belongs_to :workspace
  has_many :list_items

  validates_presence_of :name
end
