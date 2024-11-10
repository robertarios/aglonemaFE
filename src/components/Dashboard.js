// Dashboard.js
import React from "react";
import { FaUpload, FaExclamationTriangle, FaCalendarAlt, FaChartBar, FaBoxOpen } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-4">
      {/* Header Section */}
      <div className="bg-green-800 text-white p-6 rounded-lg shadow-md">
        <h1 className="text-xl font-semibold">Terima Kasih</h1>
        <p className="mt-1 text-sm">Telah Bergabung dengan Tim AgloStock</p>
        <div className="flex items-center justify-between mt-4">
          <div className="text-base font-light">
            Pencatatan inventori lebih efisien dan efektif dimulai dari AgloStock
          </div>
          <div className="flex items-center space-x-2 bg-white text-green-800 p-2 rounded-md shadow-sm cursor-pointer">
            <FaUpload className="text-lg" />
            <a href="#" className="text-sm font-medium underline">
              Buat Produk Pertamamu
            </a>
          </div>
        </div>
      </div>

      {/* Notification Bar */}
      <div className="bg-green-200 p-3 rounded-lg shadow-md flex items-center">
        <FaExclamationTriangle className="text-green-800 mr-2" />
        <p className="text-sm text-green-800 flex-1">
          Manfaatkan fitur lebih maksimal dengan verifikasi nomor handphonemu sekarang!
          <a href="#" className="text-yellow-600 font-semibold ml-1">Verifikasi Sekarang</a>
        </p>
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performa Stock Section */}
        <div className="bg-white p-6 rounded-lg shadow-md col-span-1">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Performa Stock</h2>
            <div className="flex items-center text-sm text-gray-500">
              <FaCalendarAlt className="mr-2" />
              <span>Jumat, 11 Okt - Jumat, 25 Okt 20...</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-800">
            Total Barang Masuk: <span className="text-4xl">0</span>
          </div>
        </div>

        {/* Popular Product and Non-Productive Stock Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 col-span-1">
          {/* Popular Product */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-4">Produk Populer</h2>
            <FaChartBar className="text-5xl text-blue-500 mb-2" />
            <p className="text-gray-500 text-sm">Belum ada data</p>
          </div>

          {/* Non-Productive Stock */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-4">Stok Tidak Produktif</h2>
            <FaBoxOpen className="text-5xl text-blue-500 mb-2" />
            <p className="text-gray-500 text-sm">Belum ada data</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
