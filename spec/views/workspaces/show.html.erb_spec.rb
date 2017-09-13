require 'rails_helper'

RSpec.describe "workspaces/show", type: :view do
  before(:each) do
    @workspace = assign(:workspace, Workspace.create!(
      :name => "Name",
      :user_id => 2,
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
