class VotesController < ApplicationController
  respond_to :json
  
  def index
    respond_with Vote.all
  end
  
  def show
    respond_with Vote.find(params[:id])
  end
  
  def create
    respond_with Vote.create(params[:vote])
  end
  
  def update
    respond_with Vote.update(params[:id], params[:vote])
  end
  
  def destroy
    respond_with Vote.destroy(params[:id])
  end
end
