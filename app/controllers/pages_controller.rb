class PagesController < ApplicationController
  def index
    if !session[:user_id]
      user = User.new
      user.save
      session[:user_id] = user.id
    end
  end
end
