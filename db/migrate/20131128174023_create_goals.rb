class CreateGoals < ActiveRecord::Migration
  def change
    create_table :goals do |t|
      t.string :goal_category
      #t.string :ind_goal

      t.timestamps
    end
  end
end
