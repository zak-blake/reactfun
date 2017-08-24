json.extract! list_item, :id, :name, :status, :list_id, :priority, :created_at, :updated_at
json.url list_item_url(list_item, format: :json)
