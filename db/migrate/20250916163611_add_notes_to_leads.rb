class AddNotesToLeads < ActiveRecord::Migration[8.0]
  def change
    add_column :leads, :notes, :string
  end
end
