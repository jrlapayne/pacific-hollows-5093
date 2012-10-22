class CreatePrivileges < ActiveRecord::Migration
  def change
    create_table :privileges do |t|
      t.integer :privilege_id
      t.integer :user_id
      
      t.timestamps
    end
  end
end
