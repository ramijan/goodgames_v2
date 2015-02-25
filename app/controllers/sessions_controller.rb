class SessionsController < ApplicationController

  def new
    redirect_to root_path if current_user
  end

  def create
    user = User.find_by(username: params[:user][:username])
    if user && user.authenticate(params[:user][:password])
      session[:user_id] = user.id
      redirect_to root_path
    else
      flash.now[:danger] = "Username or password is incorrect"
      render :new
    end
  end

  def destroy
    session[:user_id] = nil
    flash[:info] = "Logged out successfully"
    redirect_to login_path
  end

end