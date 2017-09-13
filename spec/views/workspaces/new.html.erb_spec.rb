require 'rails_helper'

RSpec.describe "workspaces/new", type: :view do
  before(:each) do
    assign(:workspace, Workspace.new(
      :name => "MyString",
      :user_id => 1,
      :priority => 1
    ))
  end

  it "renders new workspace form" do
    render

    assert_select "form[action=?][method=?]", workspaces_path, "post" do

      assert_select "input[name=?]", "workspace[name]"

      assert_select "input[name=?]", "workspace[user_id]"

      assert_select "input[name=?]", "workspace[priority]"
    end
  end
end
