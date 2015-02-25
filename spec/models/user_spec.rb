require 'rails_helper'

RSpec.describe User, type: :model do

  let!(:user) { FactoryGirl.build(:user) }

  ##### Factory tests #####
  context "Factory tests" do
    it "has a valid factory" do
      expect(user).to be_valid
    end
  end

  ##### Username tests #####
  context "Username tests" do
    it "responds to username" do
      expect(user).to respond_to :username
    end

    it "requires a username" do
      user.username = nil
      expect(user).to be_invalid
    end

    it "requires at least 6 characters in a username" do
      user.username = "abc"
      expect(user).to be_invalid
      user.username = "abcde"
      expect(user).to be_invalid
      user.username = "abcdef"
      expect(user).to be_valid
    end

    it "requires a unique username" do
      FactoryGirl.create(:user)
      user.email = "example2@example.com" # so that only usernames are identical
      expect(user).to be_invalid
    end

    it "does not care about case when checking for uniqueness" do
      FactoryGirl.create(:user)
      user.email = "example2@example.com"
      user.username = user.username.upcase
      expect(user).to be_invalid
    end

  end

  ##### Email tests #####
  context "Email tests" do
    it "responds to email" do
      expect(user).to respond_to :email
    end

    it "requires an email" do
      user.email = nil
      expect(user).to be_invalid
    end

    it "requires a valid email" do
      user.email = "blahblah"
      expect(user).to be_invalid
      user.email = "blahblah@"
      expect(user).to be_invalid
      user.email = "blahblah.com"
      expect(user).to be_invalid
      user.email = "@."
      expect(user).to be_invalid
    end

    it "requires a unique email" do
      FactoryGirl.create(:user)
      user.username = user.username + "a" # so that only emails are identical
      expect(user).to be_invalid
    end

    it "does not care about case when checking for uniqueness" do
      FactoryGirl.create(:user)
      user.username = user.username + "a"
      user.email = user.email.upcase
      expect(user).to be_invalid

    end
  end

  context "Password tests" do

    it "validates presence of password" do
      user.password = nil
      expect(user).to be_invalid
    end

    it "validates that password and password_confirmation match" do
      user.password_confirmation = user.password + "a"
      expect(user).to be_invalid
    end

    it "requires a password length of at least 5 characters" do
      user.password = 'abcd'
      user.password_confirmation = 'abcd'
      expect(user).to be_invalid
      user.password = 'abcde'
      user.password_confirmation = 'abcde'
      expect(user).to be_valid
    end

    it "fails to authenticate with wrong password" do
      user.save
      expect(user.authenticate("wrongpassword")).to be false
    end

    it "authenticates successfully with the right password" do
      user.save
      expect(user.authenticate(user.password)).to be_truthy
    end
  end
end
