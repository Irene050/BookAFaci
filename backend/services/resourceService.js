const Resource = require('../models/Resource');

class ResourceService {
  async createResource(data) {
    try {
      const resource = new Resource(data);
      return await resource.save();
    } catch (error) {
      throw new Error(`Error creating resource: ${error.message}`);
    }
  }

  async getAllResources(filters = {}) {
    try {
      return await Resource.find(filters);
    } catch (error) {
      throw new Error(`Error fetching resources: ${error.message}`);
    }
  }

  async getResourceById(id) {
    try {
      const resource = await Resource.findById(id);
      if (!resource) throw new Error('Resource not found');
      return resource;
    } catch (error) {
      throw new Error(`Error fetching resource: ${error.message}`);
    }
  }

  async updateResource(id, data) {
    try {
      const resource = await Resource.findByIdAndUpdate(id, data, { new: true, runValidators: true });
      if (!resource) throw new Error('Resource not found');
      return resource;
    } catch (error) {
      throw new Error(`Error updating resource: ${error.message}`);
    }
  }

  async deleteResource(id) {
    try {
      const resource = await Resource.findByIdAndDelete(id);
      if (!resource) throw new Error('Resource not found');
      return resource;
    } catch (error) {
      throw new Error(`Error deleting resource: ${error.message}`);
    }
  }
}

module.exports = new ResourceService();