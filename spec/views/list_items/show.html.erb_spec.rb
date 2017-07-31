require 'rails_helper'

RSpec.describe "list_items/show", type: :view do
  before(:each) do
    @list_item = assign(:list_item, ListItem.create!(
      :name => "Name",
      :list_id => 2,
      :priority => 3
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Name/)
    expect(rendered).to match(/2/)
    expect(rendered).to match(/3/)
  end
end
