# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :user do
    name "MyString"
    email "MyString"
    password "MyString"
    remember_token "MyString"
    admin "MyString"
  end
end
