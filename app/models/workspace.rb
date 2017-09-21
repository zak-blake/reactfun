class Workspace < ApplicationRecord
  belongs_to :user
  has_many :lists, dependent: :destroy
  has_many :list_items, through: :lists

  validates_presence_of :name

  before_validation do
    if name.blank?
      self.name = "New Workspace"
    end
  end
end
