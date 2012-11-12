class CreateUserPrivileges < ActiveRecord::Migration
  def change
    create_table :user_privileges do |t|
      t.integer :privilege_id
      t.integer :user_id
      
      t.timestamps
    end
    
    remove_column :privileges, :privilege_id
    remove_column :privileges, :user_id
    remove_column :user_achievements, :level
    
    add_column :privileges, :rep, :integer
    add_column :privileges, :kind, :string
    add_column :privileges, :thumbnail, :string
  end
end
