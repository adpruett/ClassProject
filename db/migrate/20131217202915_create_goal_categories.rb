class CreateGoalCategories < ActiveRecord::Migration
  def change
    create_table :goal_categories do |t|
      t.string :category

      t.timestamps
    end
  end
end
