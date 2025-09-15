class Lead < ApplicationRecord
  validates :name, presence: true
  validates :email, presence: true, format: {with: URI::MailTo::EMAIL_REGEXP}
  validates :status, presence: true, inclusion: {in: %w[new contacted qualified lost]}
end
