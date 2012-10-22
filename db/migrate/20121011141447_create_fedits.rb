class CreateFedits < ActiveRecord::Migration
  def change
    create_table :fedits do |t|
      t.integer :issue_id
      t.integer :question_id
      t.integer :fact_id
      t.string :title
      t.text :description
      t.text :urls
      t.integer :creator_id
      t.integer :user_id
      
      t.timestamps
    end
  end
end
