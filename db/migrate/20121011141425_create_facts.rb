class CreateFacts < ActiveRecord::Migration
  def change
    create_table :facts do |t|
      t.integer :issue_id
      t.integer :question_id
      t.string :title
      t.text :description
      t.integer :creator_id
      t.integer :votes, default: 0

      t.timestamps
    end
  end
end
