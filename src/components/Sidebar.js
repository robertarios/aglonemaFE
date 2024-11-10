// Sidebar.js
import React from "react";
import { FaTachometerAlt, FaBox, FaDatabase, FaWarehouse, FaFileAlt, FaCog } from "react-icons/fa";
import { HiChevronDown } from "react-icons/hi";
import logo from '../assets/logoicon.png';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-[#E9F3FF] shadow-lg">
      {/* Logo Section */}
      <div className="flex items-center justify-center p-4">
        {/* Logo image */}
        <img src={logo} alt="Aglostok Logo" className="h-10 mr-2" />
        <span className="text-xl font-bold ml-2 text-gray-800">Aglostok</span>
      </div>

      {/* User Section */}
      <div className="px-4 py-2 bg-[#D0E8FF] mx-4 rounded cursor-pointer flex justify-between items-center">
        <span>Nama Pengguna</span>
        <HiChevronDown />
      </div>

      {/* Navigation Menu */}
      <nav className="mt-6 px-4">
        <ul className="space-y-2">
          <li className="flex items-center text-gray-700 hover:bg-[#C7DDFE] px-4 py-2 rounded cursor-pointer">
            <FaTachometerAlt className="mr-2" />
            <span>Dashboard</span>
          </li>
          <li className="flex items-center text-gray-700 hover:bg-[#C7DDFE] px-4 py-2 rounded cursor-pointer">
            <FaBox className="mr-2" />
            <span>Produk</span>
          </li>
          <li className="flex items-center text-gray-700 hover:bg-[#C7DDFE] px-4 py-2 rounded cursor-pointer">
            <FaDatabase className="mr-2" />
            <span>Pusat Data</span>
          </li>
          <li className="flex items-center text-gray-700 hover:bg-[#C7DDFE] px-4 py-2 rounded cursor-pointer">
            <FaWarehouse className="mr-2" />
            <span>Gudang</span>
          </li>
          <li className="flex items-center text-gray-700 hover:bg-[#C7DDFE] px-4 py-2 rounded cursor-pointer">
            <FaFileAlt className="mr-2" />
            <span>Laporan</span>
          </li>
          <li className="flex items-center text-gray-700 hover:bg-[#C7DDFE] px-4 py-2 rounded cursor-pointer">
            <FaCog className="mr-2" />
            <span>Pengaturan</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
