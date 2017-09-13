class Workspace < ApplicationRecord
  belongs_to :user
  has_many :lists
  has_many :list_items, through: :lists

  validates_presence_of :name
end
