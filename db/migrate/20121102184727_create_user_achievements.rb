class CreateUserAchievements < ActiveRecord::Migration
  def change
    create_table :user_achievements do |t|
      t.integer :achievement_id
      t.integer :user_id
      t.integer :amount, default: 0
      t.integer :level, default: 0
      
      t.timestamps
    end
  end
end
