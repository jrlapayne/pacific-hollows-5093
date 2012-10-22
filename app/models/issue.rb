class Issue < ActiveRecord::Base
  attr_accessible :title, :description, :thumbnail
  
  has_many :questions, dependent: :destroy
  has_many :reputations, dependent: :destroy
end
