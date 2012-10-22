class ChangeVotesToScore < ActiveRecord::Migration
  def up
    remove_column :facts, :votes
    remove_column :questions, :votes
    add_column :issues, :score, :integer, default: 0
  end

  def down
  end
end
