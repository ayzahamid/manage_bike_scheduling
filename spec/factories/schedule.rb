FactoryBot.define do
  factory :schedule do
    bike
    date { 2.days.from_now.to_date }
  end
end
