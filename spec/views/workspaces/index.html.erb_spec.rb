require 'rails_helper'

RSpec.describe "workspaces/index", type: :view do
  before(:each) do
    assign(:workspaces, [
      Workspace.create!(
        :name => "Name",
        :user_id => 2,
        :priority => 3
      ),
      Workspace.create!(
        :name => "Name",
        :user_id => 2,
        :priority => 3
      )
    ])
  end

  it "renders a list of workspaces" do
    render
    assert_select "tr>td", :text => "Name".to_s, :count => 2
    assert_select "tr>td", :text => 2.to_s, :count => 2
    assert_select "tr>td", :text => 3.to_s, :count => 2
  end
end
