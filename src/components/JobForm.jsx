import React, { useState, useContext } from 'react';
import { JobContext } from '../context/JobContext';

const JobForm = ({ onClose }) => {
  const { addJob } = useContext(JobContext);
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    url: '',
    appliedDate: new Date().toISOString().split('T')[0],
    status: 'Applied',
    notes: '',
    salary: '',
    location: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.company && formData.position) {
      addJob(formData);
      setFormData({
        company: '',
        position: '',
        url: '',
        appliedDate: new Date().toISOString().split('T')[0],
        status: 'Applied',
        notes: '',
        salary: '',
        location: ''
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="card w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Add Job Application</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Company Name *</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g., Google, Tokopedia"
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Position *</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="e.g., Frontend Developer"
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Jakarta, Remote"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Salary Range</label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="e.g., 5-8 juta"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Applied Date</label>
              <input
                type="date"
                name="appliedDate"
                value={formData.appliedDate}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="input-field"
              >
                <option>Applied</option>
                <option>Interview</option>
                <option>Psychotest</option>
                <option>Written Test</option>
                <option>Medical Check Up</option>
                <option>Offered</option>
                <option>Accepted</option>
                <option>Rejected</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Job URL</label>
              <input
                type="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
                placeholder="https://..."
                className="input-field"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Add any notes about the position, interview details, etc."
                rows="3"
                className="input-field"
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Add Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobForm;
