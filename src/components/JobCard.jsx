import React from 'react';

const getStatusColor = (status) => {
  const colors = {
    'Applied': 'status-applied',
    'Interview': 'status-interview',
    'Psychotest': 'status-psychotest',
    'Written Test': 'status-written',
    'Medical Check Up': 'status-medical',
    'Offered': 'status-offered',
    'Accepted': 'status-accepted',
    'Rejected': 'status-rejected'
  };
  return colors[status] || 'status-applied';
};

const JobCard = ({ job, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const daysAgo = Math.floor((Date.now() - new Date(job.appliedDate)) / (1000 * 60 * 60 * 24));
  const daysLabel = daysAgo === 0 ? 'Today' : daysAgo === 1 ? 'Yesterday' : `${daysAgo} days ago`;

  return (
    <div className="card p-5 hover:shadow-lg transition-all">
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <h3 className="text-lg font-bold" style={{ color: '#32292F' }}>{job.company}</h3>
            <span className={`badge ${getStatusColor(job.status)}`}>
              {job.status}
            </span>
          </div>
          <p className="font-semibold mb-3" style={{ color: '#5762D5' }}>{job.position}</p>
          
          <div className="text-sm space-y-2 mb-3" style={{ color: '#575366' }}>
            {job.location && <p className="flex items-center"><span className="font-medium">Location:</span> <span className="ml-2">{job.location}</span></p>}
            {job.salary && <p className="flex items-center"><span className="font-medium">Salary:</span> <span className="ml-2">{job.salary}</span></p>}
            <p className="flex items-center"><span className="font-medium">Applied:</span> <span className="ml-2">{daysLabel}</span></p>
            {job.notes && <p className="mt-3 p-3 rounded-lg text-xs italic border-l-2" style={{ backgroundColor: '#D1E3DD', borderColor: '#5762D5', color: '#32292F' }}>"{job.notes}"</p>}
          </div>

          {job.url && (
            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm mt-3 inline-block font-semibold transition-all hover:gap-2"
              style={{ color: '#5762D5' }}
            >
              View Job Post →
            </a>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(job)}
            className="btn-secondary text-sm py-2 px-3 rounded-lg hover:shadow-md"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(job.id)}
            className="btn-danger text-sm py-2 px-3 rounded-lg hover:shadow-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
