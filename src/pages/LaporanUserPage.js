import React from 'react';
import Navbar from '../components/Navbar';
import Laporan from '../components/Laporan';
import NewsidebarUser from '../components/NewSidebarUser';

const LaporanUserPage = () => {
  return (
    <div className="flex">
      <NewsidebarUser />
      <div className="flex-1">
        <Navbar />
        <Laporan />
      </div>
    </div>
  );
};

export default LaporanUserPage;
