class CreateProjects < ActiveRecord::Migration[7.0]
  def change
    create_table :projects do |t|
      t.string :project_name, null: false
      t.string :owner_name, null: false
      t.string :owner_telegram, null: false
      t.string :owner_email, null: false
      t.string :image_logo
      t.text :project_description, null: false
      t.string :img_description
      t.integer :project_goal, null: false
      t.string :currency, null: false
      t.jsonb :packages, default: [], array: true
      t.jsonb :roadmap, default: [], array: true
      t.date :end_date, null: false

      t.timestamps
    end

    add_index :projects, :owner_email, unique: true
  end
end