class FactsController < ApplicationController
  respond_to :json
  
  def index
    respond_with Fact.all
  end
  
  def show
    respond_with Fact.find(params[:id])
  end
  
  def create
    respond_with Fact.create(params[:fact])
  end
  
  def update
    respond_with Fact.update(params[:id], params[:fact])
  end
  
  def destroy
    respond_with Fact.destroy(params[:id])
  end
end
