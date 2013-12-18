class UsersController < ApplicationController
  helper_method :current_user

  def index
    @user = User.new
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new user_params

    if @user.save
      flash[:notice] = "Account Created!"
      session[:user_id] = @user.id
      redirect_to :controller => 'goals', :action => 'new'
    else
      render 'index'
    end
  end

  private

  def user_params
    params.require(:user).permit(:name,:email,
                  :password,:password_confirmation)
  end

end
