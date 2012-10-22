class PrivilegesController < ApplicationController
  respond_to :json
  
  def index
    respond_with Privilege.all
  end
  
  def show
    respond_with Privilege.find(params[:id])
  end
  
  def create
    respond_with Privilege.create(params[:privilege])
  end
  
  def update
    respond_with Privilege.update(params[:id], params[:privilege])
  end
  
  def destroy
    respond_with Privilege.destroy(params[:id])
  end
end
