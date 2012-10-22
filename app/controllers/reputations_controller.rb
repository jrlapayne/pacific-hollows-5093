class ReputationsController < ApplicationController
  respond_to :json
  
  def index
    respond_with Reputation.all
  end
  
  def show
    respond_with Reputation.find(params[:id])
  end
  
  def create
    respond_with Reputation.create(params[:reputation])
  end
  
  def update
    respond_with Reputation.update(params[:id], params[:reputation])
  end
  
  def destroy
    respond_with Reputation.destroy(params[:id])
  end
end
