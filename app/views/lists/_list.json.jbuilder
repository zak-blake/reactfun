json.extract! list, :id, :name, :workspace_id, :created_at, :updated_at
json.url user_workspace_list_url(list.workspace.user, list.workspace, list, format: :json)
