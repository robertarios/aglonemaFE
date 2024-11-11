import React from 'react';
import { FaSearch, FaPlus, FaDownload, FaHistory, FaCog } from 'react-icons/fa';

const Lokasi = () => {
  return (
    <div className="p-6">
      {/* Header with Search Field */}
      <div className="flex justify-between items-center mb-4">
        <div className="relative flex-1 max-w-md">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari..."
            className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-300"
          />
        </div>
        <div className="flex items-center space-x-4 ml-4">
          <button className="flex items-center text-gray-500 hover:text-gray-700">
            <FaDownload className="mr-2" /> Export Data
          </button>
          <button className="flex items-center text-gray-500 hover:text-gray-700">
            <FaHistory className="mr-2" /> Histori Data
          </button>
        </div>
      </div>

      {/* Table Header with "Tambah" Button */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 bg-gray-100 border-b">
          <h1 className="text-xl font-semibold text-gray-700">Lokasi Gudang</h1>
          <button className="bg-green-700 text-white px-4 py-2 rounded-full flex items-center hover:bg-green-800">
            <FaPlus className="mr-2" /> Tambah
          </button>
        </div>
        
        {/* Table Content */}
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-left">
              <th className="py-4 px-6 font-semibold">Gudang ID</th>
              <th className="py-4 px-6 font-semibold">Nama</th>
              <th className="py-4 px-6 font-semibold">Lokasi Alamat</th>
              <th className="py-4 px-6 font-semibold">Rincian Alamat</th>
              <th className="py-4 px-6 font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-300 hover:bg-gray-50">
              <td className="py-4 px-6">25509</td>
              <td className="py-4 px-6">Pengguna</td>
              <td className="py-4 px-6">Doloksanggul, No 229</td>
              <td className="py-4 px-6">-</td>
              <td className="py-4 px-6">
                <button className="text-gray-600 hover:text-gray-800">
                  <FaCog />
                </button>
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

export default Lokasi;
