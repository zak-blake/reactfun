require 'rails_helper'

RSpec.describe "list_items/new", type: :view do
  before(:each) do
    assign(:list_item, ListItem.new(
      :name => "MyString",
      :list_id => 1,
      :priority => 1
    ))
  end

  it "renders new list_item form" do
    render

    assert_select "form[action=?][method=?]", list_items_path, "post" do

      assert_select "input[name=?]", "list_item[name]"

      assert_select "input[name=?]", "list_item[list_id]"

      assert_select "input[name=?]", "list_item[priority]"
    end
  end
end
