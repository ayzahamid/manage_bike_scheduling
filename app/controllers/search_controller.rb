class SearchController < ApplicationController
  def index
    @bikes = BikeSchedule.new(params[:date]).fetch_available_bikes

    respond_to do |format|
      format.html
      format.json { render json: @bikes }
    end
  end
end
