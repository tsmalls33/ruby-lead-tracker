class Lead < ApplicationRecord
  validates :name, presence: true
  validates :phone, format: { 
    with: /\A(\+?\d{1,4}[\s-]?)?\d{6,14}\z/, 
    message: "must be a valid phone number (6-14 digits, optionally starting with country code)",
    allow_blank: true
  }, uniqueness: {
    message: "is already registered for another lead",
    allow_blank: true
  }
  
  validates :email, format: { 
    with: URI::MailTo::EMAIL_REGEXP, 
    message: "must be a valid email address",
    allow_blank: true
  }, uniqueness: {
    case_sensitive: false,
    message: "is already registered for another lead",
    allow_blank: true
  }
  
  # Custom validation to ensure at least one contact method is provided
  validate :contact_method_required

  # Normalize phone number before saving
  before_save :normalize_phone_number

  private

  def contact_method_required
    if phone.blank? && email.blank?
      errors.add(:base, "Either phone number or email must be provided")
    end
  end

  def normalize_phone_number
    return if phone.blank?
    
    # Remove all spaces, hyphens, and parentheses
    self.phone = phone.gsub(/[\s\-\(\)]/, '')
  end
end
