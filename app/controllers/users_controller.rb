class UsersController < ApplicationController
  def index
    @users = Users.where('name LIKE(?)', "%#{params[:name]}%").limit(20)
    respond_to do |format|
      format.html
      format.json
  end

  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  def user_params
    params.require(:user).permit(:name, :email)
  end
end
