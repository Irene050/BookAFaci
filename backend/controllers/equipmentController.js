const equipmentService = require('../services/equipmentService');
const { isAdmin } = require('../middleware/equipmentMiddleware'); 

// medyo same lang sa facility
class EquipmentController {
  async createEquipment(req, res, next) {
    try {
      if (req.file) {
        req.body.image = `/uploads/${req.file.filename}`;
      }

      const equipment = await equipmentService.createEquipment(req.body);
      res.status(201).json({ success: true, data: equipment });
    } catch (error) {
      next(error);
    }
  }

  async getAllEquipment(req, res, next) {
    try {
      const filters = req.query;
      const equipment = await equipmentService.getAllEquipment(filters);
      res.status(200).json({ success: true, data: equipment });
    } catch (error) {
      next(error);
    }
  }

  async getEquipmentById(req, res, next) {
    try {
      const equipment = await equipmentService.getEquipmentById(req.params.id);
      res.status(200).json({ success: true, data: equipment });
    } catch (error) {
      next(error);
    }
  }

  async updateEquipment(req, res, next) {
    try {
      if (req.file) {
        req.body.image = `/uploads/${req.file.filename}`;
      }

      const equipment = await equipmentService.updateEquipment(req.params.id, req.body);
      res.status(200).json({ success: true, data: equipment });
    } catch (error) {
      next(error);
    }
  }

  async deleteEquipment(req, res, next) {
    try {
      const equipment = await equipmentService.deleteEquipment(req.params.id);
      res.status(200).json({ success: true, message: 'Equipment deleted', data: equipment });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new EquipmentController();