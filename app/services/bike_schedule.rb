class BikeSchedule < Service
  attr_reader :date

  def initialize(date = nil)
    @date = date || Date.today
  end

  def fetch_available_bikes
    Bike.available_bikes(date)
  end
end
