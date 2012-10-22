class Quedit < ActiveRecord::Base
  attr_accessible :issue_id, :question_id, :user_id, :title, :description, :category
  
  belongs_to :question
end
