class CreateListItems < ActiveRecord::Migration[5.1]
  def change
    create_table :list_items do |t|
      t.string :name
      t.integer :list_id
      t.integer :priority

      t.timestamps
    end
  end
end
