import React, { useState, useContext } from 'react';
import { JobContext } from '../context/JobContext';
import Dashboard from './Dashboard';
import FilterBar from './FilterBar';
import JobCard from './JobCard';
import JobForm from './JobForm';
import EditJobForm from './EditJobForm';

const JobList = () => {
  const { jobs, deleteJob } = useContext(JobContext);
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.company.toLowerCase().includes(search.toLowerCase()) ||
                         job.position.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDeleteJob = (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      deleteJob(id);
    }
  };

  const handleEditJob = (job) => {
    setEditingJob(job);
  };

  return (
    <div className="space-y-6">
      <Dashboard />

      <FilterBar
        onFilterChange={setStatusFilter}
        onSearchChange={setSearch}
        jobs={jobs}
      />

      <div className="flex gap-3">
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary"
        >
          Add Application
        </button>
      </div>

      {filteredJobs.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-charcoal text-base">
            {jobs.length === 0 ? 'No applications yet. Start adding your job applications.' : 'No applications match your filters.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="font-semibold text-sm uppercase tracking-wide" style={{ color: '#575366' }}>
            Showing {filteredJobs.length} of {jobs.length} applications
          </p>
          <div className="space-y-3">
            {filteredJobs.map(job => (
              <JobCard
                key={job.id}
                job={job}
                onEdit={handleEditJob}
                onDelete={handleDeleteJob}
              />
            ))}
          </div>
        </div>
      )}

      {showForm && <JobForm onClose={() => setShowForm(false)} />}
      {editingJob && <EditJobForm job={editingJob} onClose={() => setEditingJob(null)} />}
    </div>
  );
};

export default JobList;
