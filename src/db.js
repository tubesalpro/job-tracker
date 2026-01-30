import Dexie from 'dexie';
import dexieCloud from 'dexie-cloud-addon';

// Initialize Dexie with Cloud addon
export const db = new Dexie('job-tracker', { addons: [dexieCloud] });

// Define schema
db.version(1).stores({
  jobs: '@id, companyName, position, status, appliedDate, createdAt'
});

// Configure Dexie Cloud
db.cloud.configure({
  databaseUrl: 'https://zkut6vhln.dexie.cloud',
  requireAuth: false // Set to true if you want login system
});

export default db;
