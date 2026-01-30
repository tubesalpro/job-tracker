import React, { createContext, useState, useEffect } from 'react';
import { db } from '../db';
import { useLiveQuery } from 'dexie-react-hooks';

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  // Use Dexie's live query for real-time sync
  const jobs = useLiveQuery(
    () => db.jobs.orderBy('createdAt').reverse().toArray(),
    []
  ) || [];

  // Migration: Load from localStorage ONCE on first mount
  useEffect(() => {
    const migrateFromLocalStorage = async () => {
      try {
        const savedJobs = localStorage.getItem('jobApplications');
        if (savedJobs) {
          const localJobs = JSON.parse(savedJobs);
          
          // Check if database is empty
          const count = await db.jobs.count();
          
          if (count === 0 && localJobs.length > 0) {
            console.log('Migrating jobs from localStorage to Dexie Cloud...');
            await db.jobs.bulkAdd(localJobs);
            console.log(`Migrated ${localJobs.length} jobs successfully!`);
            
            // Optional: Remove from localStorage after successful migration
            // localStorage.removeItem('jobApplications');
          }
        }
      } catch (error) {
        console.error('Error migrating from localStorage:', error);
      } finally {
        setLoading(false);
      }
    };

    migrateFromLocalStorage();
  }, []);

  const addJob = async (job) => {
    try {
      const newJob = {
        id: Date.now().toString(), // Dexie Cloud needs string ID
        createdAt: new Date().toISOString(),
        ...job
      };
      
      await db.jobs.add(newJob);
      return newJob;
    } catch (error) {
      console.error('Error adding job:', error);
      throw error;
    }
  };

  const updateJob = async (id, updatedJob) => {
    try {
      await db.jobs.update(id, updatedJob);
    } catch (error) {
      console.error('Error updating job:', error);
      throw error;
    }
  };

  const deleteJob = async (id) => {
    try {
      await db.jobs.delete(id);
    } catch (error) {
      console.error('Error deleting job:', error);
      throw error;
    }
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
    <JobContext.Provider value={{ 
      jobs, 
      addJob, 
      updateJob, 
      deleteJob, 
      getStatistics, 
      loading 
    }}>
      {children}
    </JobContext.Provider>
  );
};
