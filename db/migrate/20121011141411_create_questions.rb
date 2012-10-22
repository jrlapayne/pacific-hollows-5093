class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.integer :issue_id
      t.string :title
      t.text :description
      t.integer :creator_id
      t.integer :votes, default: 0
      t.string :category
      t.boolean :has_quiz, default: false
      
      t.timestamps
    end
  end
end
