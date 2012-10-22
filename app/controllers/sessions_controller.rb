class SessionsController < ApplicationController
  def create
    #render :text => request.env["omniauth.auth"].to_yaml
    auth = request.env["omniauth.auth"]
    user = User.find_by_provider_and_uid(auth["provider"], auth["uid"]) || User.create_with_omniauth(auth, current_user)
    user.token = auth["credentials"]["token"]
    user.save
    session[:user_id] = user.id
    redirect_to root_url
  end
  
  def destroy
    session[:user_id] = nil
    redirect_to root_url
  end
end
