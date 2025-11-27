const Equipment = require('../models/Equipment');

class EquipmentService {
  async createEquipment(data) {
    try {
      const equipment = new Equipment(data);
      return await equipment.save();
    } catch (error) {
      throw new Error(`Error creating equipment: ${error.message}`);
    }
  }

  async getAllEquipment(filters = {}) {
    try {
      return await Equipment.find(filters);
    } catch (error) {
      throw new Error(`Error fetching equipments: ${error.message}`);
    }
  }

  async getEquipmentById(id) {
    try {
      const equipment = await Equipment.findById(id);
      if (!equipment) throw new Error('Equipment not found');
      return equipment;
    } catch (error) {
      throw new Error(`Error fetching equipment: ${error.message}`);
    }
  }

  async updateEquipment(id, data) {
    try {
      const equipment = await Equipment.findByIdAndUpdate(id, data, { new: true, runValidators: true });
      if (!equipment) throw new Error('Equipment not found');
      return equipment;
    } catch (error) {
      throw new Error(`Error updating equipment: ${error.message}`);
    }
  }

  async deleteEquipment(id) {
    try {
      const equipment = await Equipment.findByIdAndDelete(id);
      if (!equipment) throw new Error('Equipment not found');
      return equipment;
    } catch (error) {
      throw new Error(`Error deleting equipment: ${error.message}`);
    }
  }
}

module.exports = new EquipmentService();