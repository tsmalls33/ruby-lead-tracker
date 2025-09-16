import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="contact-validation"
export default class extends Controller {
  static targets = ["emailInput", "phoneInput", "emailStatus", "phoneStatus", "emailFeedback", "phoneFeedback"]

  connect() {
    console.log("Contact validation controller connected")
    this.validateContactMethods()
  }

  emailInputTargetConnected() {
    console.log("Email input connected")
  }

  phoneInputTargetConnected() {
    console.log("Phone input connected")
  }

  validateEmail() {
    console.log("Email input changed")
    this.validateContactMethods()
  }

  validatePhone() {
    console.log("Phone input changed")
    this.validateContactMethods()
  }

  validateContactMethods() {
    console.log("Validating contact methods...")
    
    if (!this.hasEmailInputTarget || !this.hasPhoneInputTarget) {
      console.log("Missing input targets")
      return
    }

    const emailValue = this.emailInputTarget.value.trim()
    const phoneValue = this.phoneInputTarget.value.trim()
    
    const hasEmail = emailValue.length > 0
    const hasPhone = phoneValue.length > 0
    const isValidEmail = this.isValidEmail(emailValue)
    const isValidPhone = this.isValidPhone(phoneValue)
    
    console.log("Email:", emailValue, "Valid:", isValidEmail)
    console.log("Phone:", phoneValue, "Valid:", isValidPhone)
    
    // Update email field
    this.updateField({
      input: this.emailInputTarget,
      status: this.emailStatusTarget,
      feedback: this.emailFeedbackTarget,
      hasValue: hasEmail,
      isValid: hasEmail ? isValidEmail : true,
      otherHasValue: hasPhone && isValidPhone,
      fieldType: 'email'
    })
    
    // Update phone field
    this.updateField({
      input: this.phoneInputTarget,
      status: this.phoneStatusTarget,
      feedback: this.phoneFeedbackTarget,
      hasValue: hasPhone,
      isValid: hasPhone ? isValidPhone : true,
      otherHasValue: hasEmail && isValidEmail,
      fieldType: 'phone'
    })
  }

  updateField({ input, status, feedback, hasValue, isValid, otherHasValue, fieldType }) {
    if (!input || !status || !feedback) return

    console.log(`Updating ${fieldType} field:`, { hasValue, isValid, otherHasValue })

    // Clear previous classes
    input.classList.remove('has-error', 'has-value')
    status.classList.remove('required', 'provided', 'optional')
    feedback.classList.remove('show', 'success', 'error', 'warning')

    let statusText = 'Optional*'
    let feedbackText = ''
    let feedbackClass = ''

    if (hasValue && isValid) {
      // Field has valid value
      input.classList.add('has-value')
      status.classList.add('provided')
      statusText = '✓ Provided'
      feedbackText = fieldType === 'email' ? '✓ Valid email format' : '✓ Valid phone number'
      feedbackClass = 'success'
    } else if (hasValue && !isValid) {
      // Field has invalid value
      input.classList.add('has-error')
      status.classList.add('required')
      statusText = 'Invalid'
      feedbackText = fieldType === 'email' ? '✗ Please enter a valid email address' : '✗ Please enter a valid phone number (6-14 digits, optionally with country code)'
      feedbackClass = 'error'
    } else if (!hasValue && !otherHasValue) {
      // No value in this field and other field is also empty/invalid
      status.classList.add('required')
      statusText = 'Required*'
      feedbackText = `${fieldType === 'email' ? 'Email' : 'Phone'} is required when no other contact method is provided`
      feedbackClass = 'warning'
    } else {
      // No value but other field has valid value
      status.classList.add('optional')
      statusText = 'Optional*'
      if (fieldType === 'phone') {
        feedbackText = 'Include country code (+34 for Spain) or enter Spanish number without code'
        feedbackClass = ''
      }
    }

    status.textContent = statusText
    
    if (feedbackText) {
      feedback.innerHTML = `<span>${feedbackText}</span>`
      feedback.classList.add('show', feedbackClass)
    } else if (fieldType === 'phone' && !hasValue && !feedbackClass) {
      // Always show phone help text when empty and no error
      feedback.innerHTML = '<span class="text-gray-500">Include country code (+34 for Spain) or enter Spanish number without code</span>'
      feedback.classList.add('show')
    }

    console.log(`Updated ${fieldType}:`, statusText)
  }

  isValidEmail(email) {
    if (!email) return false
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  isValidPhone(phone) {
    if (!phone) return false
    // Remove all non-digit characters except +
    const cleaned = phone.replace(/[^+\d]/g, '')
    // Check if it matches the expected pattern: optional +, 1-4 digits country code, then 6-14 digits
    const phoneRegex = /^(\+?\d{1,4}[\s-]?)?\d{6,14}$/
    return phoneRegex.test(cleaned)
  }
}