import React from 'react';
import Navbar from '../components/Navbar';
import Produk from '../components/Produk';
import Newsidebar from '../components/NewSidebar';

const ProdukPage = () => {
  return (
    <div className="flex">
      <Newsidebar />
      <div className="flex-1">
        <Navbar />
        <Produk />
      </div>
    </div>
  );
};

export default ProdukPage;
