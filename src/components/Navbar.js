import React from "react";
import { FaBars, FaBell, FaQuestionCircle } from "react-icons/fa";
import { HiChevronDown } from "react-icons/hi";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white shadow-md">
      {/* Left Side - Hamburger Icon and Dashboard Text */}
      <div className="flex items-center">
        <FaBars className="text-gray-700 mr-3 cursor-pointer" />
        <span className="text-lg font-medium text-gray-700">Dashboard</span>
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
