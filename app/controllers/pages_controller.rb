class PagesController < ApplicationController
  def index
    if !session[:user_id]
      user = User.new
      user.save
      session[:user_id] = user.id
    end
    
    if session[:user_id] && !User.find_by_id(session[:user_id])
      redirect_to :controller => 'sessions', :action => 'destroy'
    end
  end
end
