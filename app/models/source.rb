class Source < ActiveRecord::Base
  attr_accessible :fact_id, :url
  
  belongs_to :fact
end
