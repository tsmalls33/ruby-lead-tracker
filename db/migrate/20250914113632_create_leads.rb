class CreateLeads < ActiveRecord::Migration[7.2]
  def change
    create_table :leads do |t|
      t.string :name, null: false
      t.string :email, null: false
      t.string :phone
      t.string :status, default: "new", null: false

      t.timestamps
    end
  end
end
