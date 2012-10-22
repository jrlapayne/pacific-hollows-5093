class CreateIssues < ActiveRecord::Migration
  def change
    create_table :issues do |t|
      t.string :title
      t.text :description
      t.string :thumbnail
      
      t.timestamps
    end
  end
end
