class ChangeStuffOmg < ActiveRecord::Migration
  def up
    rename_column :achievements, :type, :kind
  end

  def down
  end
end
