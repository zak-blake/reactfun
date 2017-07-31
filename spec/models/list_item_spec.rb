require 'rails_helper'

RSpec.describe ListItem, type: :model do
  let(:user) {
    User.new(
      email: 'test@example.com',
      password: 'password',
      password_confirmation: 'password') }

  let(:list) {
    List.create! user: user, name: 'my first list'
  }

  subject { ListItem.new list: list, name: 'my first listitem' }

  it "should be valid" do
    expect(subject).to be_valid
  end

  it "should not be valid without a list" do
    subject.list = nil
    expect(subject).not_to be_valid
  end

  it "should not be valid without a name" do
    subject.name = nil
    expect(subject).not_to be_valid
  end
end
