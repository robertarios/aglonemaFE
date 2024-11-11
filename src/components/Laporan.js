import React from "react";
import {
  FaSearch,
  FaCalendarAlt,
  FaDownload,
  FaChartLine,
  FaCheck,
} from "react-icons/fa";

const LaporanPage = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">
      {/* Header Section */}
      <h2 className="text-lg font-bold text-[#272d3b] mb-4 text-left relative">
        Stok Produk
      </h2>
      <hr className="border-t border-[#e0e0e0] mb-4" />
      
      {/* Filter and Actions */}
      <div className="flex justify-between items-center mt-4 lg:mt-0">
        <div className="flex flex-col lg:flex-row items-start space-y-4 lg:space-y-0 lg:space-x-4 w-3/5">
          {/* Search Bar */}
          <div className="relative w-1/2">
            <span className="absolute inset-y-0 h-full left-0 flex items-center pl-3 mt-0 text-gray-500">
              <FaSearch />
            </span>
            <input
              type="text"
              placeholder="Cari SKU atau Produk..."
              className="w-full pl-10 p-2 border border-gray-500 rounded-full"
            />
          </div>

          {/* Date Filter */}
          <div className="flex items-center bg-[#EDF3FF] p-3 mt-2 rounded-full shadow-md flex-shrink-0 w-1/2 lg:w-auto">
            <FaCalendarAlt className="text-gray-500 mx-2" />
            <span className="text-gray-700 text-sm">
              Selasa, 01 Okt - Kamis, 31 Okt 20...
            </span>
          </div>
        </div>

        {/* Download Button - Positioned to the right */}
        <button className="flex items-center bg-green-800 text-white p-2 rounded-full shadow-md">
          <FaDownload className="mr-2" />
          <span>Download</span>
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-4 px-6 text-gray-500 font-semibold">
                No.
              </th>
              <th className="text-left py-4 px-6 text-gray-500 font-semibold">
                Kode SKU
              </th>
              <th className="text-left py-4 px-6 text-gray-500 font-semibold">
                Nama Produk
              </th>
              <th className="text-left py-4 px-6 text-gray-500 font-semibold">
                In
              </th>
              <th className="text-left py-4 px-6 text-gray-500 font-semibold">
                Out
              </th>
              <th className="text-left py-4 px-6 text-gray-500 font-semibold">
                Stok
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-8 text-center" colSpan="6">
                <div className="flex flex-col items-center">
                  <FaChartLine className="text-5xl text-blue-500 mb-2" />
                  <div className="text-gray-700 text-lg font-medium">
                    Laporan Stok Produk
                  </div>
                  <ul className="text-gray-500 text-sm mt-2 space-y-1">
                    <li className="flex items-center">
                      <FaCheck className="mr-2 text-green-600" /> Ketahui alur
                      keluar masuknya produk kamu
                    </li>
                    <li className="flex items-center">
                      <FaCheck className="mr-2 text-green-600" /> Fitur Premium:
                      Download ke excel atau PDF untuk cetak!
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-end mt-4">
          <div className="flex items-center space-x-1">
            <button className="px-3 py-1 bg-gray-200 text-gray-500 rounded-l">
              «
            </button>
            <button className="px-3 py-1 bg-gray-200 text-gray-500">‹</button>
            <button className="px-3 py-1 bg-green-800 text-white">1</button>
            <button className="px-3 py-1 bg-gray-200 text-gray-500">›</button>
            <button className="px-3 py-1 bg-gray-200 text-gray-500 rounded-r">
              »
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaporanPage;
