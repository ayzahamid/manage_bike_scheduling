# frozen_string_literal: true

class Schedule < ApplicationRecord
  belongs_to :bike

  validates :unavailable_date, presence: true

  scope :on_date, ->(date) { where(unavailable_date: date) }
end
