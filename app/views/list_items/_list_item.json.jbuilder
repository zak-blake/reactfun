json.extract! list_item, :id, :name, :status, :list_id, :priority, :created_at, :updated_at
json.url user_workspace_list_list_item_url(
  list_item.list.workspace.user,
  list_item.list.workspace,
  list_item.list,
  list_item,
  format: :json)
