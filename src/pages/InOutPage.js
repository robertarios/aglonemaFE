import React from 'react';
import Navbar from '../components/Navbar';
import Stock from '../components/InOut';
import Newsidebar from '../components/NewSidebar';

const InOutPage = () => {
  return (
    <div className="flex">
      <Newsidebar />
      <div className="flex-1">
        <Navbar />
        <Stock />
      </div>
    </div>
  );
};

export default InOutPage;