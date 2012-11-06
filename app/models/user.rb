class User < ActiveRecord::Base
  attr_accessible :name, :uid, :provider, :token, :is_temp_user, :rep
  has_many :achievements, dependent: :destroy
  has_many :privileges, dependent: :destroy
  has_many :reputations, dependent: :destroy
  has_many :user_achievements, dependent: :destroy
  
  def self.create_with_omniauth(auth, user)
      user.provider = auth["provider"]
      user.uid = auth["uid"]
      user.name = auth["info"]["name"]
      user.is_temp_user = false
      user.save
      return user
  end
end
