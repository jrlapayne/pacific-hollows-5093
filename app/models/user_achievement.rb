class UserAchievement < ActiveRecord::Base
  attr_accessible :achievement_id, :user_id, :amount, :level, :issue_id
  
  belongs_to :achievement
  belongs_to :user
end
