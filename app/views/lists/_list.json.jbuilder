json.extract! list, :id, :name, :user_id, :created_at, :updated_at, :list_items_count, :list_items_complete_count
json.url list_url(list, format: :json)
