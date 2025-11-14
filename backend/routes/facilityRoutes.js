const express = require('express');
const router = express.Router();
const facilityController = require('../controllers/facilityController');
const { validateFacility, upload } = require('../middleware/facilityMiddleware');

router.post('/facility', upload.single('image'), validateFacility, facilityController.createFacility);
router.get('/facility', facilityController.getAllFacilities);
router.get('/facility/:id', facilityController.getFacilityById);
router.patch('/facility/:id', upload.single('image'), validateFacility, facilityController.updateFacility);
router.delete('/facility/:id', facilityController.deleteFacility);

module.exports = router;