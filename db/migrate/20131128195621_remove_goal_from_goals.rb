class RemoveGoalFromGoals < ActiveRecord::Migration
  def change
    remove_column :goals, :goal, :string
  end
end
