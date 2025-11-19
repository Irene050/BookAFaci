const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController');
const { upload, authenticate, isAdmin } = require('../middleware/resourceMiddleware');
const { validateResource } = require('../validators/resourceValidator');

//only admins can add, updated, and delete
router.post('/resources', authenticate, isAdmin, upload.single('image'), validateResource, resourceController.createResource);
router.put('/resources/:id', authenticate, isAdmin, upload.single('image'), validateResource, resourceController.updateResource);
router.delete('/resources/:id', authenticate, isAdmin, resourceController.deleteResource);

//accessible by all
router.get('/resources', resourceController.getAllResources);  
router.get('/resources/:id', resourceController.getResourceById);  

module.exports = router;