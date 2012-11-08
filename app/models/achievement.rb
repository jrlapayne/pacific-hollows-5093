class Achievement < ActiveRecord::Base
  attr_accessible :type, :levels, :thumbnail
  
  has_many :user_achievements, dependent: :destroy
end
