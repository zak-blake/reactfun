class CreateWorkspaces < ActiveRecord::Migration[5.1]
  def change
    create_table :workspaces do |t|
      t.string :name
      t.integer :user_id
      t.integer :priority

      t.timestamps
    end
  end
end
