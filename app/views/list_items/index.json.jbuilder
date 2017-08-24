json.list_items_complete_count @complete_count
json.list_items_count @list_items.length
json.list_items do
  json.array! @list_items, partial: 'list_items/list_item', as: :list_item
end
