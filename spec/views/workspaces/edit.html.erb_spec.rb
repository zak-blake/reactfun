require 'rails_helper'

RSpec.describe "workspaces/edit", type: :view do
  before(:each) do
    @workspace = assign(:workspace, Workspace.create!(
      :name => "MyString",
      :user_id => 1,
      :priority => 1
    ))
  end

  it "renders the edit workspace form" do
    render

    assert_select "form[action=?][method=?]", workspace_path(@workspace), "post" do

      assert_select "input[name=?]", "workspace[name]"

      assert_select "input[name=?]", "workspace[user_id]"

      assert_select "input[name=?]", "workspace[priority]"
    end
  end
end
