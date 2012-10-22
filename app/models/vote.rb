class Vote < ActiveRecord::Base
  attr_accessible :question_id, :fact_id, :comment_id, :value, :user_id
  
  belongs_to :question
  belongs_to :fact
  belongs_to :comment
end
