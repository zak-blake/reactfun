json.extract! workspace, :id, :name, :user_id, :priority, :created_at, :updated_at
json.url user_workspace_url(workspace.user, workspace, format: :json)
