class CreateVotes < ActiveRecord::Migration
  def change
    create_table :votes do |t|
      t.integer :question_id
      t.integer :fact_id
      t.integer :comment_id
      t.integer :value
      t.integer :user_id
      
      t.timestamps
    end
  end
end
