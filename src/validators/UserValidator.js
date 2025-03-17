class UserValidator {
  constructor() {
    this.errors = {};
  }
  /**
   * Validates an array of field objects and stores errors.
   * @param {Array} fields - Array of field objects with 'id' and 'value' properties.
   * @returns {Object} - An object containing validation errors for each field.
   */
  validate(fields) {
    this.errors = {}; // Reset errors before validation
    let passwordValue = '';
    fields.forEach(({ id, value }) => {
      // Determine which validation method to call based on the field ID
      switch (id) {
        case 'mobile':
          this.validateMobile(value, id);
          break;
        case 'username':
          this.validateUsername(value, id);
          break;
        case 'name':
          this.validateName(value, id);
          break;
        case 'managerId':
          this.validateManagerId(value,id);
          break;
        case 'password':
          this.validatePassword(value, id);
          passwordValue=value;
          break;
        case "confirmPassword":
          this.validateConfirmPassword(value, passwordValue, id);
          break;
        
        default:
          break;
      }
    });

    return this.errors;
  }

  /**
   * Validates a password against a regular expression.
   * @param {string} password - The password to validate.
   * @param {string} id - The field ID for error reporting.
   */
  validatePassword(password, id) {
    // Regular expression for validating a password
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Test the password against the regex pattern
    if (!password || !passwordPattern.test(password)) {
      this.errors[id] = 'Password must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, one number, and one special character.';
    }
  }
  
  /**
   * Validates a password against a regular expression.
   * @param {string} confirmPassword - The password to validate.
   * @param {string} id - The field ID for error reporting.
   */
  validateConfirmPassword(confirmPassword, password, id) {
    if (!confirmPassword) {
      this.errors[id] = "Confirm Password is required.";
    } else if (confirmPassword !== password) {
      this.errors[id] = "Passwords do not match.";
    }
  }

/**
 * Validates a Manager ID.
 * @param {string | number} managerId - The Manager ID to validate.
 * @param {string} id - The field ID for error reporting.
 */
validateManagerId(managerId, id) {
  if (!managerId || isNaN(managerId)) {
    this.errors[id] = 'Manager ID is required and must be a number.';
  }
}

  /**
   * Validates a phone number.
   * @param {string} mobile - The phone number to validate.
   * @param {string} id - The field ID for error reporting.
   */
  validateMobile(mobile, id) {
    const mobileRegex = /^\+?[0-9]{10,15}$/;
    
    if (!mobile) {
      this.errors[id] = 'Mobile number is required.';
    } else if (!mobileRegex.test(mobile)) {
      this.errors[id] = 'Please enter a valid phone number.';
    }
  }

  /**
   * Validates a first name.
   * @param {string} firstName - The first name to validate.
   * @param {string} id - The field ID for error reporting.
   */
  validateUsername(firstName, id) {
    if (!firstName || firstName.length < 2) {
      this.errors[id] = 'Username must be at least 2 characters long.';
    }
  }

  /**
   * Validates a last name.
   * @param {string} lastName - The last name to validate.
   * @param {string} id - The field ID for error reporting.
   */
  validateName(lastName, id) {
    if (!lastName || lastName.length < 2) {
      this.errors[id] = 'Name must be at least 2 characters long.';
    }
  }
}

export default UserValidator;
