import React, { useState } from 'react';

const FilterBar = ({ onFilterChange, onSearchChange, jobs }) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const handleSearch = (value) => {
    setSearch(value);
    onSearchChange(value);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    onFilterChange(status);
  };

  const statuses = ['All', 'Applied', 'Interview', 'Psychotest', 'Written Test', 'Medical Check Up', 'Offered', 'Accepted', 'Rejected'];

  return (
    <div className="card p-6 space-y-4">
      <div>
        <input
          type="text"
          placeholder="Search by company or position"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="input-field w-full form-input"
        />
      </div>

      <div>
        <label className="block text-sm font-bold mb-3 uppercase tracking-widest" style={{ color: '#32292F', letterSpacing: '0.05em' }}>Filter by Status</label>
        <div className="flex flex-wrap gap-2">
          {statuses.map(status => (
            <button
              key={status}
              onClick={() => handleStatusFilter(status)}
              className={statusFilter === status ? 'filter-btn-active' : ''}
              style={
                statusFilter === status
                  ? { 
                      background: 'linear-gradient(135deg, #5762D5 0%, #3d4a9f 100%)',
                      color: 'white', 
                      padding: '10px 18px', 
                      borderRadius: '8px', 
                      fontWeight: '600', 
                      transition: 'all 0.4s ease-out',
                      border: 'none', 
                      cursor: 'pointer',
                      boxShadow: '0 6px 20px rgba(87, 98, 213, 0.35)',
                      fontSize: '14px'
                    }
                  : { 
                      background: 'linear-gradient(135deg, #D1E3DD 0%, #e8f4f0 100%)',
                      color: '#32292F', 
                      padding: '10px 18px', 
                      borderRadius: '8px', 
                      fontWeight: '500', 
                      transition: 'all 0.3s ease', 
                      border: '1.5px solid #c4dbd5',
                      cursor: 'pointer',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                      fontSize: '14px'
                    }
              }
              onMouseEnter={(e) => {
                if (statusFilter !== status) {
                  e.target.style.boxShadow = '0 6px 14px rgba(87, 98, 213, 0.2)';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.background = 'linear-gradient(135deg, #D1E3DD 0%, #d9ede9 100%)';
                }
              }}
              onMouseLeave={(e) => {
                if (statusFilter !== status) {
                  e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.06)';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.background = 'linear-gradient(135deg, #D1E3DD 0%, #e8f4f0 100%)';
                }
              }}
            >
              {status}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
