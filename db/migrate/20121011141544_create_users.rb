class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.string :provider
      t.string :uid
      t.string :token
      t.boolean :is_temp_user, default: true
      t.integer :rep, default: 0
      
      t.timestamps
    end
  end
end
