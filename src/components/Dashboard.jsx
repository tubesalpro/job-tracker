import React, { useContext } from 'react';
import { JobContext } from '../context/JobContext';

const Dashboard = () => {
  const { getStatistics } = useContext(JobContext);
  const stats = getStatistics();

  const statCards = [
    { label: 'Total', value: stats.total },
    { label: 'Applied', value: stats.applied },
    { label: 'Interview', value: stats.interview },
    { label: 'Offered', value: stats.offered },
    { label: 'Accepted', value: stats.accepted },
    { label: 'Rejected', value: stats.rejected }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-4">
      {statCards.map((stat, idx) => (
        <div key={idx} className="stat-card card p-5 rounded-xl text-center" style={{
          background: 'linear-gradient(135deg, #D1E3DD 0%, #ffffff 100%)',
          borderColor: '#6E7DAB'
        }}>
          <div className="text-3xl font-bold mb-1" style={{ color: '#5762D5' }}>{stat.value}</div>
          <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#575366' }}>{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
