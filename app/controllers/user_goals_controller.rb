class UserGoalsController < ApplicationController
  def index
    user = UserGoal.all
    @user_goals = user.where(user_id: current_user.id)
  end

  def new
    @user_goal = UserGoal.new
  end

  def create
    user_goal = UserGoal.new goal_params

    user_goal.user_id = current_user.id
    user_goal.save

    @user_goals = UserGoal.all.where(user_id: current_user.id)

    redirect_to root_url

  end

  def show
  end

  def edit
  end

  private
  def goal_params
    params.require(:user_goal).permit(:goal_id, :user_id)
  end

end
