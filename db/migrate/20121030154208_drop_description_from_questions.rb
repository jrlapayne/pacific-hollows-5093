class DropDescriptionFromQuestions < ActiveRecord::Migration
  def up
    remove_column :questions, :description
    remove_column :achievements, :achievement_id
    remove_column :achievements, :user_id
    
    add_column :achievements, :type, :string
    add_column :achievements, :levels, :string
  end

  def down
  end
end
