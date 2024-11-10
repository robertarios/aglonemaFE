import React from "react";
import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faBox,
  faDatabase,
  faWarehouse,
  faFileAlt,
  faCogs,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

// Impor gambar logo
import Logo from "../assets/logodark.png"; // Sesuaikan path sesuai lokasi gambar

function Newsidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 h-screen bg-[#EDF3FF] shadow flex-col justify-start items-start">
      {/* Logo */}
      <div className="px-4 py-4 bg-[#edf3ff] flex justify-center items-center">
        <img className="relative left-0 top-0" src={Logo} alt="Logo" />
      </div>

      {/* Sidebar Menu */}
      <div className="h-screen bg-[#EDF3FF]">
        <div className="pt-6 pb-8 flex justify-start items-center pl-5 pr-4 py-[13.51px] bg-[#DAE6FF]">
          <div className="text-sm font-normal leading-[21px]">
            Nama Pengguna
          </div>
          <div className="ml-auto">
            <FontAwesomeIcon icon={faChevronDown} className="text-sm" />
          </div>
        </div>

        <SidebarItem
          icon={faTachometerAlt}
          label="Dashboard"
          path="/dashboard"
          isActive={isActive("/dashboard")}
        />
        <DropdownMenu
          icon={faBox}
          label="Produk"
          isActive={isActive("/produk")}
        />
        <DropdownMenu
          icon={faDatabase}
          label="Pusat Data"
          isActive={isActive("/pusat-data")}
        />
        <DropdownMenu
          icon={faWarehouse}
          label="Gudang"
          isActive={isActive("/gudang")}
        />
        <DropdownMenu
          icon={faFileAlt}
          label="Laporan"
          isActive={isActive("/laporan")}
        />
        <SidebarItem
          icon={faCogs}
          label="Pengaturan"
          path={"/editprofile"}
          isActive={isActive("/editprofile", "/dashboard")} // Menggunakan isActive untuk cek path aktif
        />
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, path, isActive }) {
  return (
    <Link to={path}>
      <div
        className={`h-[58.02px] py-[5px] flex justify-start items-center pl-5 pr-4 py-[13.51px] ${
          isActive ? "bg-[#457468]/40 border-l-4 border-[#16423c]" : ""
        }`}
      >
        <div className="w-10 flex justify-start items-center">
          <FontAwesomeIcon
            icon={icon}
            className={`text-sm ${
              isActive ? "text-[#16423c]" : "text-[#2f6d64]"
            }`}
          />
        </div>
        <div
          className={`text-sm font-normal leading-[21px] ${
            isActive ? "text-[#16423c]" : "text-[#2f6d64]"
          }`}
        >
          {label}
        </div>
      </div>
    </Link>
  );
}

function DropdownMenu({ icon, label, isActive }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div>
      <div
        className={`h-[58.02px] py-[5px] flex justify-start items-center pl-5 pr-4 py-[13.51px] cursor-pointer ${
          isOpen ? "bg-[#457468]/40 border-l-4 border-[#16423c]" : ""
        }`}
        onClick={toggleDropdown}
      >
        <div className="w-10 flex justify-start items-center">
          <FontAwesomeIcon
            icon={icon}
            className={`text-sm ${
              isActive ? "text-[#16423c]" : "text-[#2f6d64]"
            }`}
          />
        </div>
        <div
          className={`text-sm font-normal leading-[21px] ${
            isActive ? "text-[#16423c]" : "text-[#2f6d64]"
          }`}
        >
          {label}
        </div>
        <div className="ml-auto">
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`text-sm ${
              isActive ? "text-[#16423c]" : "text-[#2f6d64]"
            }`}
          />
        </div>
      </div>
      {isOpen && (
        <div className="pl-12 bg-[#f4f7fb]">
          <SidebarItem label="Sub-menu 1" />
          <SidebarItem label="Sub-menu 2" />
          <SidebarItem label="Sub-menu 3" />
        </div>
      )}
    </div>
  );
}

export default Newsidebar;
