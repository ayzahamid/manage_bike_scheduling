require 'rails_helper'

RSpec.describe Schedule, type: :model do
  it "validates presence of unavailable date" do
    schedule = Schedule.new
    schedule.valid?

    expect(schedule.errors[:unavailable_date]).to include("can't be blank")
  end
end
