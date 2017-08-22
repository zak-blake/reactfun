class AddStatusToListItems < ActiveRecord::Migration[5.1]
  def change
    add_column :list_items, :status, :integer, default: 0, null: false
  end
end
