class CreateReputations < ActiveRecord::Migration
  def change
    create_table :reputations do |t|
      t.integer :issue_id
      t.integer :user_id
      t.integer :rep, default: 0
      
      t.timestamps
    end
  end
end
