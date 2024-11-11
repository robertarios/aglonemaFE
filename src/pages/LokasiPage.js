import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Lokasi from '../components/Lokasi';

const LokasiPage = () => {
  return (
    <div className="flex">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1">
        {/* Navbar Component */}
        <Navbar />

        {/* Lokasi Content */}
        <div className="p-6">
          <Lokasi />
        </div>
      </div>
    </div>
  );
};

export default LokasiPage;
