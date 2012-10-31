class DropDescriptionFromQuestions < ActiveRecord::Migration
  def up
    remove_column :questions, :description
  end

  def down
  end
end
