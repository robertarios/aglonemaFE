import React from 'react';
import Newsidebar from '../components/NewSidebar';
import Navbar from '../components/Navbar';
import Laporan from '../components/Laporan';

const LaporanPage = () => {
  return (
    <div className="flex">
      <Newsidebar />
      <div className="flex-1">
        <Navbar />
        <Laporan />
      </div>
    </div>
  );
};

export default LaporanPage;
