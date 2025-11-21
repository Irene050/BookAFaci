const express = require('express');
const router = express.Router();
const facilityController = require('../controllers/facilityController');
const { upload, authenticate, isAdmin } = require('../middleware/facilityMiddleware');
const { validateFacility } = require('../validators/facilityValidator');

//only admins can add, updated, and delete
router.post('/facility', authenticate, isAdmin, upload.single('image'), validateFacility, facilityController.createFacility);
router.put('/facility/:id', authenticate, isAdmin, upload.single('image'), validateFacility, facilityController.updateFacility);
router.delete('/facility/:id', authenticate, isAdmin, facilityController.deleteFacility);

//accessible by all
router.get('/facility', facilityController.getAllFacilities);
router.get('/facility/:id', facilityController.getFacilityById);

module.exports = router;