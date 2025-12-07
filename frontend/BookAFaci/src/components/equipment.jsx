import React, { useEffect, useState, useRef } from "react";
import { X, Upload, Image, CheckCircle, XCircle, Edit3, Wrench } from "lucide-react";

const base = import.meta.env.VITE_API_URL || "";

export default function EquipmentModal({ isOpen, onClose, onSubmit, equipment = null, isEdit = false }) {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    status: 'active',
    image: null,
    imagePreview: null
  });
  const [loading, setLoading] = useState(false);
  const initialSerializedRef = useRef(null);
  const [isUnchanged, setIsUnchanged] = useState(true);

  useEffect(() => {
    if (isOpen) {
      if (isEdit && equipment) {
        setFormData({
          name: equipment.name || '',
          quantity: equipment.quantity || '',
          status: equipment.status || 'active',
          image: null,
          imagePreview: equipment.image ? (equipment.image.startsWith('http') ? equipment.image : `${base}${equipment.image}`) : null
        });

        const initial = {
          name: equipment.name || '',
          quantity: equipment.quantity ? String(equipment.quantity) : '',
          status: equipment.status || 'active'
        };
        initialSerializedRef.current = JSON.stringify(initial);
      } else {
        setFormData({
          name: '',
          quantity: '',
          status: 'active',
          image: null,
          imagePreview: null
        });

        const initial = {
          name: '',
          quantity: '',
          status: 'active'
        };
        initialSerializedRef.current = JSON.stringify(initial);
      }
    }
  }, [isOpen, isEdit, equipment]);

  const serializeForm = (vals) => {
    return JSON.stringify({
      name: vals.name || '',
      quantity: vals.quantity ? String(vals.quantity) : '',
      status: vals.status || 'active'
    });
  };

  useEffect(() => {
    if (initialSerializedRef.current == null) {
      setIsUnchanged(true);
      return;
    }
    const current = serializeForm(formData);
    setIsUnchanged(current === initialSerializedRef.current);
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        image: file,
        imagePreview: preview
      }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const payload = {
        name: formData.name,
        quantity: parseInt(formData.quantity),
        status: formData.status
      };

      onSubmit(payload, formData.image, isEdit ? equipment._id : null);
    } catch (error) {
      console.error('Submit error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] no-scrollbar overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Wrench size={24} className="text-[#007BDA]" />
                {isEdit ? 'Edit Equipment' : 'Add New Equipment'}
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={24} className="text-gray-500" />
              </button>
            </div>
          </div>

          <form onSubmit={handleFormSubmit} className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">Equipment Name *</label>
              <input 
                id="name" 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="quantity">Quantity *</label>
              <input 
                id="quantity" 
                type="number" 
                name="quantity" 
                value={formData.quantity} 
                onChange={handleInputChange} 
                min="1" 
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="status">Status *</label>
              <select 
                id="status" 
                name="status" 
                value={formData.status} 
                onChange={handleInputChange} 
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center" htmlFor="image-upload">
                <Image size={18} className="mr-2" />
                Equipment Image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                <input id="image-upload" type="file" name="image" accept="image/*" onChange={handleImageChange} className="hidden" />
                <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center">
                  <Upload size={32} className="text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 mb-2">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
                </label>
              </div>
              {formData.imagePreview && (
                <div className="mt-4">
                  <img src={formData.imagePreview} alt="Equipment Preview" className="w-full h-48 object-cover rounded-xl shadow-md" />
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <button 
                type="button" 
                onClick={onClose}
                className="flex-1 px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-all border border-gray-200"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={loading || (isEdit ? (isUnchanged || !formData.name || !formData.quantity) : (!formData.name || !formData.quantity))}
                className="flex-1 px-6 py-3 relative overflow-hidden group text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#346D9A] to-[#83C9FF] transition-all duration-300 ease-in-out group-hover:opacity-0" />
                <span className="absolute inset-0 bg-gradient-to-r from-[#83C9FF] to-[#346D9A] opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100" />
                <span className="relative z-10 font-medium">
                  {loading ? 'Saving...' : (isEdit ? 'Update Equipment' : 'Add Equipment')}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
