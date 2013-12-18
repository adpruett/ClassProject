class CreateUserGoals < ActiveRecord::Migration
  def change
    create_table :user_goals do |t|
      t.integer :goal_key
      t.integer :user_key

      t.timestamps
    end
  end
end
