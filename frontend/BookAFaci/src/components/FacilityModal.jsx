import React, { useEffect, useState, useRef } from "react";
import { X, Upload, Image, Calendar, CheckCircle, XCircle, Edit3 } from "lucide-react";
const base = import.meta.env.VITE_API_URL || "";

export default function FacilityModal({ isOpen, onClose, onSubmit, facility = null, isEdit = false }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    capacity: '',
    status: 'active',
    availability: [],
    image: null,
    imagePreview: null
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempDateRange, setTempDateRange] = useState({ startDate: null, endDate: null });
  const [loading, setLoading] = useState(false);
  const initialSerializedRef = useRef(null);
  const [isUnchanged, setIsUnchanged] = useState(true);

  useEffect(() => {
    if (isOpen) {
      if (isEdit && facility) {
        setFormData({
          name: facility.name || '',
          description: facility.description || '',
          capacity: facility.capacity || '',
          status: facility.status || 'active',
          availability: (facility.availability || []).map(r => ({
            startDate: r?.startDate ? new Date(r.startDate) : null,
            endDate: r?.endDate ? new Date(r.endDate) : null
          })),
          image: null,
          imagePreview: facility.image ? (facility.image.startsWith('http') ? facility.image : `${base}${facility.image}`) : null
        });
        
        const initial = {
          name: facility.name || '',
          description: facility.description || '',
          capacity: facility.capacity ? String(facility.capacity) : '',
          status: facility.status || 'active',
          availability: (facility.availability || []).map(r => {
            const start = r?.startDate ? new Date(r.startDate) : null;
            const end = r?.endDate ? new Date(r.endDate) : null;
            return {
              start: start ? start.toISOString().split('T')[0] : null,
              end: end ? end.toISOString().split('T')[0] : null
            };
          })
        };
        initialSerializedRef.current = JSON.stringify(initial);
      } else {
        setFormData({
          name: '',
          description: '',
          capacity: '',
          status: 'active',
          availability: [],
          image: null,
          imagePreview: null
        });

        const initial = {
          name: '',
          description: '',
          capacity: '',
          status: 'active',
          availability: []
        };
        initialSerializedRef.current = JSON.stringify(initial);
      }
      setTempDateRange({ startDate: null, endDate: null });
      setShowDatePicker(false);
    }
  }, [isOpen, isEdit, facility]);

  const serializeForm = (vals) => {
    return JSON.stringify({
      name: vals.name || '',
      description: vals.description || '',
      capacity: vals.capacity ? String(vals.capacity) : '',
      status: vals.status || 'active',
      availability: (vals.availability || []).map(r => {
        const start = r?.startDate ? new Date(r.startDate) : null;
        const end = r?.endDate ? new Date(r.endDate) : null;
        return {
          start: start ? start.toISOString().split('T')[0] : null,
          end: end ? end.toISOString().split('T')[0] : null
        };
      })
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

  const addDateRange = () => {
    if (tempDateRange.startDate && tempDateRange.endDate && tempDateRange.endDate >= tempDateRange.startDate) {
      setFormData(prev => ({
        ...prev,
        availability: [...prev.availability, { 
          startDate: tempDateRange.startDate, 
          endDate: tempDateRange.endDate 
        }]
      }));
      setTempDateRange({ startDate: null, endDate: null });
      setShowDatePicker(false);
    } else {
      alert('End date must be on or after start date.');
    }
  };

  const removeDateRange = (index) => {
    setFormData(prev => ({
      ...prev,
      availability: prev.availability.filter((_, i) => i !== index)
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const availability = formData.availability.map(range => ({
        startDate: range.startDate ? range.startDate.toISOString().split('T')[0] : null,
        endDate: range.endDate ? range.endDate.toISOString().split('T')[0] : null
      }));

      const payload = {
        name: formData.name,
        description: formData.description,
        capacity: parseInt(formData.capacity),
        status: formData.status,
        availability: availability 
      };

      onSubmit(payload, formData.image, isEdit ? facility._id : null);
    } catch (error) {
      console.error('Submit error:', error);
    } finally {
      setLoading(false);
    }
  };

  const DateRangePicker = () => (
    <div className="space-y-4 p-4 bg-gray-50 rounded-xl border font-inter">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
          <input
            type="date"
            value={tempDateRange.startDate ? tempDateRange.startDate.toISOString().split('T')[0] : ''}
            onChange={(e) => setTempDateRange(prev => ({
              ...prev,
              startDate: e.target.value ? new Date(e.target.value) : null
            }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
          <input
            type="date"
            value={tempDateRange.endDate ? tempDateRange.endDate.toISOString().split('T')[0] : ''}
            onChange={(e) => setTempDateRange(prev => ({
              ...prev,
              endDate: e.target.value ? new Date(e.target.value) : null
            }))}
            min={tempDateRange.startDate ? tempDateRange.startDate.toISOString().split('T')[0] : ''}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={addDateRange}
          disabled={!tempDateRange.startDate || !tempDateRange.endDate}
          className="flex-1 px-6 py-2 bg-gradient-to-r from-[#346D9A] to-[#83C9FF] text-white rounded-xl font-medium hover:from-[#83C9FF] hover:to-[#346D9A] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <CheckCircle size={20} />
          Add Date Range
        </button>
        <button
          type="button"
          onClick={() => {
            setShowDatePicker(false);
            setTempDateRange({ startDate: null, endDate: null });
          }}
          className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-all border border-gray-200 flex items-center justify-center gap-2"
        >
          <XCircle size={20} />
          Cancel
        </button>
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] no-scrollbar overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {isEdit ? 'Edit Facility' : 'Add New Facility'}
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={24} className="text-gray-500" />
              </button>
            </div>
          </div>

          <form onSubmit={handleFormSubmit} className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">Facility Name *</label>
              <input id="name" type="text" name="name" value={formData.name} onChange={handleInputChange} required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="description">Description</label>
              <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-vertical" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="capacity">Capacity *</label>
              <input id="capacity" type="number" name="capacity" value={formData.capacity} onChange={handleInputChange} min="1" required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="status">Status *</label>
              <select id="status" name="status" value={formData.status} onChange={handleInputChange} required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="under maintenance">Under Maintenance</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Calendar size={18} className="mr-2" />
                Availability Dates
              </label>
              {showDatePicker ? (
                <DateRangePicker />
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <span className="text-sm font-medium text-blue-800 flex items-center gap-2">
                      <Calendar size={18} />
                      {formData.availability.length === 0 ? "No availability dates set" : `${formData.availability.length} date range(s) added`}
                    </span>
                    <button type="button" onClick={() => setShowDatePicker(true)}
                      className="px-4 py-2 bg-white border border-blue-500 text-blue-600 rounded-xl hover:bg-blue-50 font-medium transition-all flex items-center gap-2 text-sm">
                      <Calendar size={16} /> Add Dates
                    </button>
                  </div>
                  {formData.availability.length > 0 && (
                    <div className="max-h-32 overflow-y-auto space-y-2">
                      {formData.availability.map((range, index) => {
                        const startLabel = range?.startDate instanceof Date
                          ? range.startDate.toLocaleDateString()
                          : '-';
                        const endLabel = range?.endDate instanceof Date
                          ? range.endDate.toLocaleDateString()
                          : '-';
                        return (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                            <span className="text-sm text-gray-900">
                              {startLabel} - {endLabel}
                            </span>
                            <button type="button" onClick={() => removeDateRange(index)}
                              className="p-1 hover:bg-red-100 rounded-full transition-colors">
                              <X size={16} className="text-red-500" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center" htmlFor="image-upload">
                <Image size={18} className="mr-2" />
                Facility Image
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
                  <img src={formData.imagePreview} alt="Facility Preview" className="w-full h-48 object-cover rounded-xl shadow-md" />
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <button type="button" onClick={onClose}
                className="flex-1 px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-all border border-gray-200">
                Cancel
              </button>
              <button type="submit" disabled={loading || (isEdit ? (isUnchanged || !formData.name || !formData.capacity) : (!formData.name || !formData.capacity))}
                className="flex-1 px-6 py-3 relative overflow-hidden group text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed">
                <span className="absolute inset-0 bg-gradient-to-r from-[#346D9A] to-[#83C9FF] transition-all duration-300 ease-in-out group-hover:opacity-0" />
                <span className="absolute inset-0 bg-gradient-to-r from-[#83C9FF] to-[#346D9A] opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100" />
                <span className="relative z-10 font-medium">
                  {loading ? 'Saving...' : (isEdit ? 'Update Facility' : 'Add Facility')}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}