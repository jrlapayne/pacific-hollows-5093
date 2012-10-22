class Fedit < ActiveRecord::Base
  attr_accessible :issue_id, :question_id, :fact_id, :title, :description, :urls, :user_id
  
  belongs_to :fact
end
