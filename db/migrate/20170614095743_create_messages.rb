class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.string :content
      t.integer :from
      t.integer :timestamp

      t.timestamps null: false
    end
  end
end
