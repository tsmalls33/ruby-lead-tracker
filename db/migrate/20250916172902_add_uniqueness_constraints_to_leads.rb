class AddUniquenessConstraintsToLeads < ActiveRecord::Migration[8.0]
  def change
    # Add unique index for email (case-insensitive)
    add_index :leads, 'lower(email)', unique: true, name: 'index_leads_on_lower_email'
    
    # Add unique index for phone
    add_index :leads, :phone, unique: true, name: 'index_leads_on_phone'
  end
end
