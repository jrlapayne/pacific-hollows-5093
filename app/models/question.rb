class Question < ActiveRecord::Base
  attr_accessible :issue_id, :title, :score, :user_id, :category, :has_quiz, :edit_id
  
  belongs_to :issue
  has_many :facts, dependent: :destroy
  has_many :quedits, dependent: :destroy
  has_many :tasks, dependent: :destroy
  has_many :votes, dependent: :destroy
  has_many :answers, dependent: :destroy
end
