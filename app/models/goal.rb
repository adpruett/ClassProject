class Goal < ActiveRecord::Base

  validates :goal, presence: true

  has_many :user_goals
  has_many :users, through: :user_goals

  GOAL_CATEGORY = ["Health","Lifestyle","Financial"]
end
