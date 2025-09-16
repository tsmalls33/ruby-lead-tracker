json.extract! lead, :id, :name, :email, :phone, :status, :notes, :created_at, :updated_at
json.url lead_url(lead, format: :json)
