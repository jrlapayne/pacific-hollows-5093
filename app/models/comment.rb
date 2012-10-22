class Comment < ActiveRecord::Base
  attr_accessible :question_id, :fact_id, :user_id, :content, :votes, :ancestry
  
  belongs_to :question
  belongs_to :fact
  has_many :votes, dependent: :destroy
end
