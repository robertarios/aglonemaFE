import React from 'react';
import NewSidebar from '../components/NewSidebar';
import Navbar from '../components/Navbar';
import Laporan from '../components/Laporan';

const LaporanPage = () => {
  return (
    <div className="flex">
      <NewSidebar />
      <div className="flex-1">
        <Navbar />
        <Laporan />
      </div>
    </div>
  );
};

export default LaporanPage;
