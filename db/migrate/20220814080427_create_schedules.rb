class CreateSchedules < ActiveRecord::Migration[6.1]
  def change
    create_table :schedules do |t|
      t.references :bike, foreign_key: true
      t.datetime :unavailable_date, null: false

      t.timestamps
    end
  end
end
