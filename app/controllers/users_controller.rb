class UsersController < ApplicationController
  helper_method :current_user

  def index
    if session[:user_id]
      redirect_to :controller => 'user_goals', :action => 'index'
    else
      @user = User.new
      @message = ""

      @user_login = User.find_by(email: params[:email])
      if @user_login && @user_login.authenticate(params[:password])
        session[:user_id] = @user_login.id
        flash[:notice] = "Signed in"
        redirect_to :controller => 'user_goals', :action => 'index'

      else
        flash.now[:notice] = "Email/password did not match"
        render 'index'

      end
    end
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new user_params

    if @user.save
      flash[:notice] = "Account Created!"
      session[:user_id] = @user.id
      redirect_to :controller => 'user_goals', :action => 'new'
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
