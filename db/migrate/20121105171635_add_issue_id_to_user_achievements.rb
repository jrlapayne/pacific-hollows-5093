class AddIssueIdToUserAchievements < ActiveRecord::Migration
  def change
    add_column :user_achievements, :issue_id, :integer
  end
end
