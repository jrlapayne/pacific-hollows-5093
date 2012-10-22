class CreateAchievements < ActiveRecord::Migration
  def change
    create_table :achievements do |t|
      t.integer :achievement_id
      t.integer :user_id
      
      t.timestamps
    end
  end
end
