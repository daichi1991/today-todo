class CreateTodos < ActiveRecord::Migration[6.0]
  def change
    create_table :todos do |t|
      t.references :board, null: false, foreign_key: true
      t.string :title, null: false
      t.text :memo
      t.boolean :active, null: false, default: true
      t.integer :position, null: false
      t.timestamps
    end
  end
end
