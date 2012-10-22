class Answer < ActiveRecord::Base
  attr_accessible :question_id, :content, :is_correct
  
  belongs_to :question
end
