class FeditsController < ApplicationController
  respond_to :json
  
  def index
    respond_with Fedit.all
  end
  
  def show
    respond_with Fedit.find(params[:id])
  end
  
  def create
    respond_with Fedit.create(params[:fedit])
  end
  
  def update
    respond_with Fedit.update(params[:id], params[:fedit])
  end
  
  def destroy
    respond_with Fedit.destroy(params[:id])
  end
end
