import React from 'react';
import Navbar from '../components/Navbar';
import Dashboard from '../components/Dashboard';
import Newsidebar from '../components/NewSidebar';

const DashboardPage = () => {
  return (
    <div className="flex">
      <Newsidebar />
      <div className="flex-1">
        <Navbar />
        <Dashboard />
      </div>
    </div>
  );
};

export default DashboardPage;
