class Privilege < ActiveRecord::Base
  attr_accessible :rep, :kind, :thumbnail
  
  has_many :user_privileges, dependent: :destroy
end
