import React from "react";
import { FaBars, FaBell, FaQuestionCircle } from "react-icons/fa";
import { HiChevronDown } from "react-icons/hi";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  // Tentukan judul berdasarkan path halaman saat ini
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/laporan":
        return "Laporan";
      case "/gudang":
        return "Gudang";
      case "/editprofile":
        return "Pengaturan";
      // Tambahkan lebih banyak kasus sesuai halaman yang Anda miliki
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="flex items-center justify-between px-8 py-6 bg-white shadow-md">
      {/* Left Side - Hamburger Icon and Page Title */}
      <div className="flex items-center">
        <FaBars className="text-gray-700 mr-3 cursor-pointer" />
        <span className="text-lg font-medium text-gray-700">
          {getPageTitle()}
        </span>
      </div>

      {/* Right Side - User Dropdown, Help, and Notification Icons */}
      <div className="flex items-center space-x-6">
        {/* User Dropdown */}
        <div className="flex items-center cursor-pointer">
          <span className="text-gray-700">Pengguna</span>
          <HiChevronDown className="text-gray-700 ml-1" />
        </div>

        {/* Help Icon */}
        <div className="cursor-pointer">
          <FaQuestionCircle className="text-gray-700" />
        </div>

        {/* Notification Icon */}
        <div className="cursor-pointer">
          <FaBell className="text-gray-700" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
