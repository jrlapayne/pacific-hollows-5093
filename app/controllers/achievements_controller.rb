class AchievementsController < ApplicationController
  respond_to :json
  
  def index
    respond_with Achievement.all
  end
  
  def show
    respond_with Achievement.find(params[:id])
  end
  
  def create
    respond_with Achievement.create(params[:achievement])
  end
  
  def update
    respond_with Achievement.update(params[:id], params[:achievement])
  end
  
  def destroy
    respond_with Achievement.destroy(params[:id])
  end
end
