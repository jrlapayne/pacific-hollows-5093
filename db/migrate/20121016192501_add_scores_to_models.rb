class AddScoresToModels < ActiveRecord::Migration
  def change
    add_column :questions, :score, :integer, default: 0
    add_column :facts, :score, :integer, default: 0
    add_column :comments, :score, :integer, default: 0
  end
end
