class UserPrivilege < ActiveRecord::Base
  attr_accessible :privilege_id, :user_id
  
  belongs_to :privilege
  belongs_to :user
end
