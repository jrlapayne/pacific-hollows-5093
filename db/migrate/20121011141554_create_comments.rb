class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.integer :question_id
      t.integer :fact_id
      t.integer :user_id
      t.text :content
      t.integer :votes, default: 0
      t.string :ancestry
       
      t.timestamps
    end
  end
end
