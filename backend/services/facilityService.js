const Facility = require('../models/Facility');

//changed the syntax sa mas naiintindihan q
class FacilityService {
  async createFacility(data) {
    try {
      const facility = new Facility(data);
      return await facility.save();
    } catch (error) {
      throw new Error(`Error creating facility: ${error.message}`);
    }
  }

  async getAllFacilities(filters = {}) {
    try {
      return await Facility.find(filters);
    } catch (error) {
      throw new Error(`Error fetching facilities: ${error.message}`);
    }
  }

  async getFacilityById(id) {
    try {
      const facility = await Facility.findById(id);
      if (!facility) throw new Error('Facility not found');
      return facility;
    } catch (error) {
      throw new Error(`Error fetching facility: ${error.message}`);
    }
  }

  async updateFacility(id, data) {
    try {
      const facility = await Facility.findByIdAndUpdate(id, data, { new: true, runValidators: true });
      if (!facility) throw new Error('Facility not found');
      return facility;
    } catch (error) {
      throw new Error(`Error updating facility: ${error.message}`);
    }
  }

  async deleteFacility(id) {
    try {
      const facility = await Facility.findByIdAndDelete(id);
      if (!facility) throw new Error('Facility not found');
      return facility;
    } catch (error) {
      throw new Error(`Error deleting facility: ${error.message}`);
    }
  }
}

module.exports = new FacilityService();