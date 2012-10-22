class QueditsController < ApplicationController
  respond_to :json
  
  def index
    respond_with Quedit.all
  end
  
  def show
    respond_with Quedit.find(params[:id])
  end
  
  def create
    respond_with Quedit.create(params[:quedit])
  end
  
  def update
    respond_with Quedit.update(params[:id], params[:quedit])
  end
  
  def destroy
    respond_with Quedit.destroy(params[:id])
  end
end
