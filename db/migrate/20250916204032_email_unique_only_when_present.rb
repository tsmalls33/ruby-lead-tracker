class EmailUniqueOnlyWhenPresent < ActiveRecord::Migration[8.0]
  def change
    remove_index :leads, :email if index_exists?(:leads, :email, unique: true)
    # Unique only when phone is not NULL
    add_index :leads, :email, unique: true, where: "email IS NOT NULL"
  end
end
