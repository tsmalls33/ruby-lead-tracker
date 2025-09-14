class CreateLeads < ActiveRecord::Migration[7.2]
  def change
    create_table :leads do |t|
      t.string :name
      t.string :email
      t.string :phone
      t.integer :status

      t.timestamps
    end
  end
end
