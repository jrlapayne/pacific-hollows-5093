class Task < ActiveRecord::Base
  attr_accessible :question_id, :user_id, :is_quiz, :answer_id
  
  belongs_to :question
end
