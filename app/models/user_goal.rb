class UserGoal < ActiveRecord::Base
  belongs_to :users
  belongs_to :goals
end
