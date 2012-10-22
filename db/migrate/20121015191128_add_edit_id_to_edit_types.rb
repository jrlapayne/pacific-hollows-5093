class AddEditIdToEditTypes < ActiveRecord::Migration
  def change
    add_column :questions, :edit_id, :integer
    add_column :facts, :edit_id, :integer  
    
    remove_column :quedits, :creator_id
    remove_column :fedits, :creator_id
    
    rename_column :questions, :creator_id, :user_id
    rename_column :facts, :creator_id, :user_id  
  end
end
