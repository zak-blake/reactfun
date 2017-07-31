require 'rails_helper'

RSpec.describe "list_items/index", type: :view do
  before(:each) do
    assign(:list_items, [
      ListItem.create!(
        :name => "Name",
        :list_id => 2,
        :priority => 3
      ),
      ListItem.create!(
        :name => "Name",
        :list_id => 2,
        :priority => 3
      )
    ])
  end

  it "renders a list of list_items" do
    render
    assert_select "tr>td", :text => "Name".to_s, :count => 2
    assert_select "tr>td", :text => 2.to_s, :count => 2
    assert_select "tr>td", :text => 3.to_s, :count => 2
  end
end
