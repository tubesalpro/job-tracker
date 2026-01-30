import React from 'react';
import JobList from './components/JobList';
import { JobProvider } from './context/JobContext';
import './index.css';

function App() {
  return (
    <JobProvider>
      <div className="min-h-screen bg-white">
        <header className="bg-white border-b border-frozen-water sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-shadow-grey tracking-tight">
                  Job Tracker
                </h1>
                <p className="text-charcoal text-sm mt-2">Track your applications in one place</p>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <JobList />
        </main>

        <footer className="bg-white border-t border-frozen-water mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-charcoal text-sm">
            <p>Keep applying, stay focused on your goal</p>
          </div>
        </footer>
      </div>
    </JobProvider>
  );
}

export default App;
