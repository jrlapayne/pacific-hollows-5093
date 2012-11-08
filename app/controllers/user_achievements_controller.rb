class UserAchievementsController < ApplicationController
  respond_to :json
  
  def index
    respond_with UserAchievement.all
  end
  
  def show
    respond_with UserAchievement.find(params[:id])
  end
  
  def create
    respond_with UserAchievement.create(params[:user_achievement])
  end
  
  def update
    respond_with UserAchievement.update(params[:id], params[:user_achievement])
  end
  
  def destroy
    respond_with UserAchievement.destroy(params[:id])
  end
end
