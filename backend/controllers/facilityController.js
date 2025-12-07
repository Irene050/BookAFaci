const facilityService = require('../services/facilityService');
const { isAdmin } = require('../middleware/facilityMiddleware'); 

//changed the syntax sa mas naiintindihan q
class FacilityController {
  async createFacility(req, res, next) {
    try {
      if (req.file) {
        req.body.image = `/uploads/${req.file.filename}`;
      }
      const facility = await facilityService.createFacility(req.body);
      res.status(201).json({ success: true, data: facility });
    } catch (error) {
      next(error);
    }
  }

  async getAllFacilities(req, res, next) {
    try {
      const filters = req.query;
      const facilities = await facilityService.getAllFacilities(filters);
      res.status(200).json({ success: true, data: facilities });
    } catch (error) {
      next(error);
    }
  }

  async getFacilityById(req, res, next) {
    try {
      const facility = await facilityService.getFacilityById(req.params.id);
      res.status(200).json({ success: true, data: facility });
    } catch (error) {
      next(error);
    }
  }

  async updateFacility(req, res, next) {
    try {
      if (req.file) {
        req.body.image = `/uploads/${req.file.filename}`;
      }
      const facility = await facilityService.updateFacility(req.params.id, req.body);
      res.status(200).json({ success: true, data: facility });
    } catch (error) {
      next(error);
    }
  }

  async deleteFacility(req, res, next) {
    try {
      const facility = await facilityService.deleteFacility(req.params.id);
      res.status(200).json({ success: true, message: 'Facility deleted', data: facility });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new FacilityController();