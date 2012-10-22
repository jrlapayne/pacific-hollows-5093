class Source < ActiveRecord::Base
  attr_accessible :fact_id, :url, :user_id
  
  belongs_to :fact
end
