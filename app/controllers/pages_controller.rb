class PagesController < ApplicationController
  def index
    if !session[:user_id]
      user = User.new
      user.save
      session[:user_id] = user.id
    end
    
    @test_msg = test_function
  end
end
