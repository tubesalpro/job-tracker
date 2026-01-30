import React, { createContext, useState, useEffect } from 'react';

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    const savedJobs = localStorage.getItem('jobApplications');
    if (savedJobs) {
      try {
        setJobs(JSON.parse(savedJobs));
      } catch (error) {
        console.error('Error loading jobs:', error);
      }
    }
    setLoading(false);
  }, []);

  // Save to localStorage whenever jobs change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('jobApplications', JSON.stringify(jobs));
    }
  }, [jobs, loading]);

  const addJob = (job) => {
    const newJob = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      ...job
    };
    setJobs([newJob, ...jobs]);
    return newJob;
  };

  const updateJob = (id, updatedJob) => {
    setJobs(jobs.map(job => job.id === id ? { ...job, ...updatedJob } : job));
  };

  const deleteJob = (id) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  const getStatistics = () => {
    const total = jobs.length;
    const applied = jobs.filter(j => j.status === 'Applied').length;
    const interview = jobs.filter(j => j.status === 'Interview').length;
    const offered = jobs.filter(j => j.status === 'Offered').length;
    const accepted = jobs.filter(j => j.status === 'Accepted').length;
    const rejected = jobs.filter(j => j.status === 'Rejected').length;

    return { total, applied, interview, offered, accepted, rejected };
  };

  return (
    <JobContext.Provider value={{ jobs, addJob, updateJob, deleteJob, getStatistics, loading }}>
      {children}
    </JobContext.Provider>
  );
};
