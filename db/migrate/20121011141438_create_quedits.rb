class CreateQuedits < ActiveRecord::Migration
  def change
    create_table :quedits do |t|
      t.integer :issue_id
      t.integer :question_id
      t.string :title
      t.text :description
      t.integer :creator_id
      t.integer :user_id
      t.string :category
      
      t.timestamps
    end
  end
end
