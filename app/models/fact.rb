class Fact < ActiveRecord::Base
  attr_accessible :issue_id, :question_id, :title, :description, :votes, :user_id, :edit_id
  
  belongs_to :question
  has_many :comments, dependent: :destroy
  has_many :fedits, dependent: :destroy
  has_many :votes, dependent: :destroy
  has_many :sources, dependent: :destroy
end
