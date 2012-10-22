class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.integer :question_id
      t.integer :user_id
      t.boolean :is_quiz, default: false
      t.integer :answer_id
      t.timestamps
    end
  end
end
