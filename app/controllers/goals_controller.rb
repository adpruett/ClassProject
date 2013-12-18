class GoalsController < ApplicationController
  def index
    @goals = Goal.all
    @goal = Goal.new

    @goal_categories_for_dropdown = []
    @goals.each do |i|
      @goal_categories_for_dropdown = @goal_categories_for_dropdown << [i.goal_category,i.id]
    end

    @goals_for_dropdown = []
    @goals.each do |i|
      @goals_for_dropdown = @goals_for_dropdown << [i.ind_goal,i.id]
    end

    @user = User.new
  end

  def new
    @goals = Goal.all
    @goal = Goal.new

    @user = User.new

    @goal_categories_for_dropdown = []
    @goals.each do |i|
      @goal_categories_for_dropdown = @goal_categories_for_dropdown << [i.goal_category,i.id]
    end

    @goals_for_dropdown = []
    @goals.each do |i|
      @goals_for_dropdown = @goals_for_dropdown << [i.ind_goal,i.id]
    end

  end

  def create

    @user_goal = Goal.new goal_params


    if @user_goal.save
      redirect_to goals_url
    else
      render 'new'
    end

    @user = User.new user_params

    if @user.save
      flash[:notice] = "Account Created!"
      session[:user_id] = @user.id
      redirect_to livaloud_url
    else
      render 'new'
    end

  end



  def edit
  end

  def show
  end



  private
  def goal_params
    params.require(:goal).permit(:ind_goal)
  end

  def user_params
    params.require(:user).permit(:name,:email,
                  :password,:password_confirmation)
  end

end
