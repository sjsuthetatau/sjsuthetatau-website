const Validator = require('validator');
const isEmpty = require('is-empty');

/**
 * Converts all empty fields in request body to empty strings for Validator
 * @param requestBody the data object holding all form inputs as fields
 */
function convertFieldsToString(requestBody) {
  const sanitizedData = requestBody;
  Object.keys(sanitizedData).forEach((key) => {
    sanitizedData[key] = !isEmpty(sanitizedData[key]) ? sanitizedData[key] : '';
    // Casting number input to string
    if (typeof sanitizedData[key] === 'number') {
      sanitizedData[key] = String(sanitizedData[key]);
    }
  });
  return sanitizedData;
}

/**
 * Takes in registration form input from frontend and checks validity
 * @param requestBody the data object holding all form inputs as fields
 */
function validateRegisterInput(requestBody) {
  const errors = {};

  // Convert empty fields to empty strings (Validator only works with strings)
  const data = convertFieldsToString(requestBody);

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  } else if (!Validator.isEmail(data.email)) {
    errors.email = 'Email field must be valid';
  }
  if (!Validator.isEmpty(data.studentID)) {
    if (!Validator.isNumeric(data.studentID)) {
      errors.studentID = 'Student ID must be a number';
    } else if (!Validator.isLength(data.studentID, { min: 9, max: 9 })) {
      errors.studentID = 'Student ID must be 9 characters';
    }
  }
  if (Validator.isEmpty(data.phoneNumber)) {
    errors.phoneNumber = 'Phone number field is required';
  } else if (!Validator.isNumeric(data.phoneNumber)) {
    errors.phoneNumber = 'Phone number must be a number';
  } else if (!Validator.isLength(data.phoneNumber, { min: 10, max: 10 })) {
    errors.phoneNumber = 'Phone number must be 10 digits';
  }
  if (Validator.isEmpty(data.major)) {
    errors.major = 'Major field is required';
  }
  if (Validator.isEmpty(data.graduatingYear)) {
    errors.graduatingYear = 'Graduate year field is required';
  } else if (!Validator.isNumeric(data.graduatingYear)) {
    errors.graduatingYear = 'Graduate year must be a number';
  } else if (!Validator.isLength(data.graduatingYear, { min: 4, max: 4 })) {
    errors.graduatingYear = 'Graduate year must be valid year';
  }
  if (Validator.isEmpty(data.pledgeClass)) {
    errors.pledgeClass = 'Pledge class field is required';
  }
  if (Validator.isEmpty(data.position)) {
    errors.position = 'Position field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}

module.exports = validateRegisterInput;
