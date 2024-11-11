import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Produk from '../components/Produk';

const ProdukPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <Produk />
      </div>
    </div>
  );
};

export default ProdukPage;
