class Achievement < ActiveRecord::Base
  attr_accessible :achievement_id, :user_id
  
  belongs_to :user
end
