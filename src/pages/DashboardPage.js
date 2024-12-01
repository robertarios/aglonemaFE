import React, { useState } from "react";
import Navbar from '../components/Navbar';
import Dashboard from '../components/Dashboard';
import Newsidebar from '../components/NewSidebar';
import NewsidebarUser from '../components/NewSidebarUser';

const DashboardPage = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [role, setRole] = useState(localStorage.getItem('role') || '');

  if (role == "admin"){
    return (
      <div className="flex">
        <Newsidebar />
        <div className="flex-1">
          <Navbar />
          <Dashboard />
        </div>
      </div>
    );
  }

  if (role == "user"){
    return (
      <div className="flex">
        <NewsidebarUser />
        <div className="flex-1">
          <Navbar />
          <Dashboard />
        </div>
      </div>
    );
  }

  
};

export default DashboardPage;
