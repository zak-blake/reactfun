class ChangeListUserIdToWorkspaceId < ActiveRecord::Migration[5.1]
  def change
    rename_column :lists, :user_id, :workspace_id
  end
end
