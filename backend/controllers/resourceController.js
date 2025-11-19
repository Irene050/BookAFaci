const resourceService = require('../services/resourceService');
const { isAdmin } = require('../middleware/resourceMiddleware'); 

// medyo same lang sa facility
class ResourceController {
  async createResource(req, res, next) {
    try {
      if (req.file) {
        req.body.image = `/uploads/${req.file.filename}`;
      }

      const resource = await resourceService.createResource(req.body);
      res.status(201).json({ success: true, data: resource });
    } catch (error) {
      next(error);
    }
  }

  async getAllResources(req, res, next) {
    try {
      const filters = req.query;
      const resources = await resourceService.getAllResources(filters);
      res.status(200).json({ success: true, data: resources });
    } catch (error) {
      next(error);
    }
  }

  async getResourceById(req, res, next) {
    try {
      const resource = await resourceService.getResourceById(req.params.id);
      res.status(200).json({ success: true, data: resource });
    } catch (error) {
      next(error);
    }
  }

  async updateResource(req, res, next) {
    try {
      if (req.file) {
        req.body.image = `/uploads/${req.file.filename}`;
      }

      const resource = await resourceService.updateResource(req.params.id, req.body);
      res.status(200).json({ success: true, data: resource });
    } catch (error) {
      next(error);
    }
  }

  async deleteResource(req, res, next) {
    try {
      const resource = await resourceService.deleteResource(req.params.id);
      res.status(200).json({ success: true, message: 'Resource deleted', data: resource });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ResourceController();