FactoryGirl.define do
  factory :user do
    username "testuser"
    email "example@example.com"
    password "password"
    password_confirmation "password"
  end
end
