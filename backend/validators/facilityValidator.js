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
    .isIn(['active', 'inactive', 'under maintenance'])
    .withMessage('Status must be active, inactive, or under maintenance'),
  body('availability')
    .optional()
    .customSanitizer((value) => {
      let arr;
      if (typeof value === 'string') {
        try {
          arr = JSON.parse(value);
          if (!Array.isArray(arr)) {
            throw new Error('Availability must be a valid JSON array of date range objects');
          }
        } catch (e) {
          throw new Error('Availability must be a valid JSON array of date range objects');
        }
      } else if (Array.isArray(value)) {
        arr = value;
      } else {
        throw new Error('Availability must be an array of date range objects');
      }

      for (const range of arr) {
        if (typeof range !== 'object' || range === null) {
          throw new Error('Each availability item must be an object with startDate and endDate');
        }
        const { startDate, endDate } = range;
        if (!startDate || !endDate) {
          throw new Error('Each availability range must have startDate and endDate');
        }
        if (isNaN(new Date(startDate).getTime())) {
          throw new Error('startDate must be a valid date');
        }
        if (isNaN(new Date(endDate).getTime())) {
          throw new Error('endDate must be a valid date');
        }
        if (new Date(endDate) < new Date(startDate)) {
          throw new Error('endDate must not be before startDate');
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

module.exports = { validateFacility };
