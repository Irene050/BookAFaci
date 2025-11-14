const { body, validationResult } = require('express-validator');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5mb lang pwede
});

//mas maayos na pag validate!! tyL
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

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ success: false, message: 'File too large. Max size is 5MB.' });
    }
  }
  res.status(500).json({ success: false, message: err.message || 'Internal Server Error' });
};

module.exports = { validateFacility, upload, errorHandler };