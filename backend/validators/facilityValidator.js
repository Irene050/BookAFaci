const { body, validationResult } = require('express-validator');

const validateFacility = [
  body('name')
    .isString()
    .notEmpty()
    .withMessage('Name is required and must be a string'),
  body('capacity')
    .isInt({ min: 1 })
    .withMessage('Capacity must be a positive integer'),
  body('status')
    .optional()
    .isIn(['active', 'inactive'])
    .withMessage('Status must be active or inactive'),
  body('availability')
    .optional()
    .customSanitizer((value) => {
      let arr;
      if (typeof value === 'string') {
        try {
          arr = JSON.parse(value);
          if (!Array.isArray(arr)) {
            throw new Error('Availability must be a valid JSON array of dates');
          }
        } catch (e) {
          throw new Error('Availability must be a valid JSON array of dates');
        }
      } else if (Array.isArray(value)) {
        arr = value;
      } else {
        throw new Error('Availability must be an array of dates');
      }
      for (const date of arr) {
        if (isNaN(new Date(date).getTime())) {
          throw new Error('Each availability date must be a valid date');
        }
      }
      return arr;
    }),
  body('image')
    .optional()
    .isString()
    .withMessage('Image must be a valid path'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateFacility }