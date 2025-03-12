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
    fields.forEach(({ id, value }) => {
      // Determine which validation method to call based on the field ID
      switch (id) {
        case 'email':
          this.validateEmail(value, id);
          break;
        case 'phone':
          this.validatePhone(value, id);
          break;
        case 'firstName':
          this.validateFirstName(value, id);
          break;
        case 'lastName':
          this.validateLastName(value, id);
          break;
        case 'companyName':
          this.validateCompanyName(value, id);
          break;
        case 'countryName':
          this.validateCountryName(value, id);
          break;
        case 'position':
          this.validatePosition(value, id);
          break;
        case 'industry':
          this.validateIndustry(value, id);
          break;
        case 'companySize':
          this.validateCompanySize(value, id);
          break;
        case 'password':
          this.validatePassword(value, id);
          break;
        // Add more cases for other fields as needed
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
   * Validates an email address.
   * @param {string} email - The email address to validate.
   * @param {string} id - The field ID for error reporting.
   */
  validateEmail(email, id) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      this.errors[id] = 'Please enter a valid email address.';
    }
  }

  /**
   * Validates a phone number.
   * @param {string} phone - The phone number to validate.
   * @param {string} id - The field ID for error reporting.
   */
  validatePhone(phone, id) {
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    if (phone && !phoneRegex.test(phone)) {
      this.errors[id] = 'Please enter a valid phone number.';
    }
  }

  /**
   * Validates a first name.
   * @param {string} firstName - The first name to validate.
   * @param {string} id - The field ID for error reporting.
   */
  validateFirstName(firstName, id) {
    if (!firstName || firstName.length < 2) {
      this.errors[id] = 'First name must be at least 2 characters long.';
    }
  }

  /**
   * Validates a last name.
   * @param {string} lastName - The last name to validate.
   * @param {string} id - The field ID for error reporting.
   */
  validateLastName(lastName, id) {
    if (!lastName || lastName.length < 2) {
      this.errors[id] = 'Last name must be at least 2 characters long.';
    }
  }

  /**
   * Validates a company name.
   * @param {string} companyName - The company name to validate.
   * @param {string} id - The field ID for error reporting.
   */
  validateCompanyName(companyName, id) {
    if (!companyName || companyName.length < 2) {
      this.errors[id] = 'Company name must be at least 2 characters long.';
    }
  }

  /**
   * Validates a country name.
   * @param {string} countryName - The country name to validate.
   * @param {string} id - The field ID for error reporting.
   */
  validateCountryName(countryName, id) {
    if (!countryName || countryName.length < 2) {
      this.errors[id] = 'Country name must be at least 2 characters long.';
    }
  }

  /**
   * Validates a position.
   * @param {string} position - The position to validate.
   * @param {string} id - The field ID for error reporting.
   */
  validatePosition(position, id) {
    if (!position || position.length < 2) {
      this.errors[id] = 'Position must be at least 2 characters long.';
    }
  }

  /**
   * Validates an industry.
   * @param {string} industry - The industry to validate.
   * @param {string} id - The field ID for error reporting.
   */
  validateIndustry(industry, id) {
    if (!industry || industry.length < 2) {
      this.errors[id] = 'Industry must be at least 2 characters long.';
    }
  }

  /**
   * Validates a company size.
   * @param {string} companySize - The company size to validate.
   * @param {string} id - The field ID for error reporting.
   */
  validateCompanySize(companySize, id) {
    if (!companySize ||  companySize.length < 2) {
      this.errors[id] = 'Company size must be a positive number.';
    }
  }
}

export default UserValidator;
