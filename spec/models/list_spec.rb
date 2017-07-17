require "rails_helper"

RSpec.describe List, type: :model do
  let(:user) {
    User.new(
      email: 'test@example.com',
      password: 'password',
      password_confirmation: 'password') }

  subject { List.new name: 'my list', user: user }

  it "should be valid" do
    expect(subject).to be_valid
  end

  it "should not be valid without a user" do
    subject.user = nil
    expect(subject).not_to be_valid
  end

  it "should not be valid without a name" do
    subject.name = nil
    expect(subject).not_to be_valid
  end

  it "should not be valid with a blank name" do
    subject.name = ''
    expect(subject).not_to be_valid
  end
end
