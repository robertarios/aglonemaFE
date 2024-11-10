import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Laporan from '../components/Laporan';

const LaporanPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <Laporan />
      </div>
    </div>
  );
};

export default LaporanPage;
