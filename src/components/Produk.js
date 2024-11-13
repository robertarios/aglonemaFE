import React from 'react';
import { FaSearch, FaPlus, FaHistory, FaFileExcel, FaList, FaCheck } from 'react-icons/fa';

const Produk = () => {
  return (
    <div className="p-6">
      {/* Header Section with Tabs and Total Asset */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-6">
          <h1 className="text-2xl font-semibold text-green-700 border-b-2 border-green-700 cursor-pointer">Inventori</h1>
          <h2 className="text-2xl font-semibold text-gray-400 cursor-pointer">Kategori</h2>
        </div>
        <div className="flex items-center space-x-4 text-gray-500">
          <button className="flex items-center text-green-700 space-x-1">
            <FaList className="mr-1" /> <span>Total Seluruh Asset</span>
          </button>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4 w-2/3">
          <div className="relative w-full">
            <FaSearch className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari produk..."
              className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-full text-gray-500 focus:outline-none">
            <option>Semua Kategori</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-full text-gray-500 focus:outline-none">
            <option>Filter</option>
          </select>
        </div>
        <button className="bg-green-700 text-white px-4 py-2 rounded-full flex items-center space-x-1 hover:bg-green-800">
          <FaFileExcel className="mr-1" /> <span>Data Excel</span>
        </button>
      </div>

      {/* Product Table with Title and Actions in Header */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 bg-gray-100 border-b border-gray-300">
          <h1 className="text-lg font-semibold">Daftar Produk</h1>
          <div className="flex items-center space-x-4">
            <button className="flex items-center text-gray-500">
              <FaHistory className="mr-1" /> Histori Data
            </button>
            <button className="bg-green-700 text-white px-4 py-2 rounded-full hover:bg-green-800 flex items-center">
              <FaPlus /> <span>Produk</span>
            </button>
          </div>
        </div>

        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-left border-b border-gray-300">
              <th className="py-4 px-6 font-semibold"><input type="checkbox" /></th>
              <th className="py-4 px-6 font-semibold">SKU</th>
              <th className="py-4 px-6 font-semibold">Nama</th>
              <th className="py-4 px-6 font-semibold">Stok</th>
              <th className="py-4 px-6 font-semibold">Status</th>
              <th className="py-4 px-6 font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-300 hover:bg-gray-50">
              <td colSpan="6" className="py-4 px-6 text-gray-500">
                <p className="font-bold text-lg text-black mb-4 text-left">Inventori</p>
                <ul className="text-black space-y-2">
                  <li className="flex items-center">
                    <FaCheck className="text-green-700 mr-2" /> Daftarkan produkmu terlebih dahulu sebelum melakukan penyimpanan apapun
                  </li>
                  <li className="flex items-center">
                    <FaCheck className="text-green-700 mr-2" /> Beri tanggal kadaluarsa bila perlu
                  </li>
                  <li className="flex items-center">
                    <FaCheck className="text-green-700 mr-2" /> Atur spesifikasi tambahan produk pada menu 'Pengaturan' bila perlu
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center space-x-2 mt-4">
        <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100">&lt;</button>
        <button className="px-3 py-1 border border-gray-300 rounded bg-green-700 text-white">1</button>
        <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100">&gt;</button>
      </div>
    </div>
  );
};

export default Produk;
