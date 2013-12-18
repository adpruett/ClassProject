class AddGoalToGoals < ActiveRecord::Migration
  def change
    add_column :goals, :ind_goal, :string
  end
end
