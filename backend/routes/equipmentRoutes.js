const express = require('express');
const router = express.Router();
const equipmentController = require('../controllers/equipmentController');
const { upload, authenticate, isAdmin } = require('../middleware/equipmentMiddleware');
const { validateEquipment } = require('../validators/equipmentValidator');

//only admins can add, updated, and delete
router.post('/equipment', authenticate, isAdmin, upload.single('image'), validateEquipment, equipmentController.createEquipment);
router.put('/equipment/:id', authenticate, isAdmin, upload.single('image'), validateEquipment, equipmentController.updateEquipment);
router.delete('/equipment/:id', authenticate, isAdmin, equipmentController.deleteEquipment);

//accessible by all
router.get('/equipment', equipmentController.getAllEquipment);  
router.get('/equipment/:id', equipmentController.getEquipmentById);  

module.exports = router;