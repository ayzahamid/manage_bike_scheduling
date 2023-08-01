class Bike < ApplicationRecord
  has_many :bookings
  has_many :schedules

  scope :bikes_unavailable, ->(date) { includes(:schedules).where(schedules: { unavailable_date: date }) }
  scope :bikes_booked, ->(date) { includes(:bookings).where(bookings: { date: date }) }

  scope :available_bikes, ->(date) { where.not(id: unavailable_bike_ids(date) ) }

  def self.unavailable_bike_ids(date)
    (bikes_unavailable(date) + bikes_booked(date)).pluck(:id)
  end
end
