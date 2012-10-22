class CreateSources < ActiveRecord::Migration
  def change
    create_table :sources do |t|
      t.integer :fact_id
      t.text :url
      
      t.timestamps
    end
  end
end
