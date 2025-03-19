class FeedbackValidator {
    constructor() {
      this.errors = {};
    }
  
    /**
     * Validates an array of field objects and stores errors.
     * @param {Object} formData - The form data object containing all fields.
     * @returns {Object} - An object containing validation errors for each field.
     */
    validate(formData) {
      this.errors = {}; // Reset errors
  
      this.validateExistingDealer(formData.existingDealer, "existingDealer");
      this.validateComments(formData.comments, "comments");
      this.validateRating(formData.rating, "rating");
      this.validateOrders(formData.orders, "orders");
  
      return this.errors;
    }
  
    /**
     * Validates if existing dealer field is either "Yes" or "No".
     * @param {string} value - The value to validate.
     * @param {string} id - The field ID for error reporting.
     */
    validateExistingDealer(value, id) {
      if (!value || (value !== "Yes" && value !== "No")) {
        this.errors[id] = 'Existing dealer is required.';
      }
    }
  
    /**
     * Validates if comments are not empty.
     * @param {string} value - The comment text.
     * @param {string} id - The field ID for error reporting.
     */
    validateComments(value, id) {
      if (!value || value.trim().length === 0) {
        this.errors[id] = "Comments cannot be empty.";
      }
    }
  
    /**
     * Validates if rating is between 1 and 5.
     * @param {number} value - The rating value.
     * @param {string} id - The field ID for error reporting.
     */
    validateRating(value, id) {
      if (!value || value < 1 || value > 5) {
        this.errors[id] = "Rating is required.";
      }
    }
  
    /**
     * Validates each order's brand and quantity.
     * @param {Array} orders - The array of order objects.
     * @param {string} id - The field ID for error reporting.
     */
    validateOrders(orders, id) {
  
      orders.forEach((order, index) => {
        if (!order.brand || order.brand.trim().length === 0) {
          this.errors[`order_${index}_brand`] = "Brand is required.";
        }
        if (!order.quantity || order.quantity.trim().length === 0) {
          this.errors[`order_${index}_quantity`] = "Quantity is required.";
        }
      });
    }
  }
  
  export default FeedbackValidator;
  