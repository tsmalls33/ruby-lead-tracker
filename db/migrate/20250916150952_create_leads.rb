class CreateLeads < ActiveRecord::Migration[8.0]
  def change
    unless table_exists?(:leads)
      create_table :leads do |t|
        t.string :name
        t.string :email
        t.string :phone
        t.string :status
        t.string :notes

        t.timestamps
      end
    end
  end
end
