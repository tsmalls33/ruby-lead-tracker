class UniqueOnlyWhenPresent < ActiveRecord::Migration[8.0]
  def change
    remove_index :leads, :phone if index_exists?(:leads, :phone, unique: true)
    # Unique only when phone is not NULL
    add_index :leads, :phone, unique: true, where: "phone IS NOT NULL"
  end
end
