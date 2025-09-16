module ApplicationHelper
  def whatsapp_link(phone_number)
    return "#" if phone_number.blank?
    
    formatted_number = format_phone_for_whatsapp(phone_number)
    "https://wa.me/#{formatted_number}"
  end

  private

  def format_phone_for_whatsapp(phone_number)
    # Remove all non-digit characters except +
    cleaned = phone_number.to_s.gsub(/[^+\d]/, '')
    
    # If it starts with +, remove the + and use the number as is
    if cleaned.start_with?('+')
      cleaned[1..-1]
    # If it starts with 34 (Spain code), use as is
    elsif cleaned.start_with?('34') && cleaned.length > 2
      cleaned
    # If it starts with 00, replace with nothing (European international format)
    elsif cleaned.start_with?('00')
      cleaned[2..-1]
    # If it doesn't start with country code, assume it's a Spanish number
    else
      # Remove leading 0 if present (common in national formats)
      cleaned = cleaned.sub(/^0/, '')
      "34#{cleaned}"
    end
  end
end
