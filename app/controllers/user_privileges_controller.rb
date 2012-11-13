class UserPrivilegesController < ApplicationController
  respond_to :json
  
  def index
    respond_with UserPrivilege.all
  end
  
  def show
    respond_with UserPrivilege.find(params[:id])
  end
  
  def create
    respond_with UserPrivilege.create(params[:user_privilege])
  end
  
  def update
    respond_with UserPrivilege.update(params[:id], params[:user_privilege])
  end
  
  def destroy
    respond_with UserPrivilege.destroy(params[:id])
  end
end
