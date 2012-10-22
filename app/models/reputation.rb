class Reputation < ActiveRecord::Base
  attr_accessible :user_id, :issue_id, :rep
  
  belongs_to :user
  belongs_to :issue
end
