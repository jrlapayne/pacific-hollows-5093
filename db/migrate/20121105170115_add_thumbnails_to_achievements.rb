class AddThumbnailsToAchievements < ActiveRecord::Migration
  def change
    add_column :achievements, :thumbnail, :string
  end
end
