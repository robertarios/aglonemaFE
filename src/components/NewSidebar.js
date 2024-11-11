import React, { useState } from "react";
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

  const isActive = (path) => location.pathname.startsWith(path);

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
          items={[
            { label: "Sub-menu 1", path: "/produk/submenu1" },
            { label: "Sub-menu 2", path: "/produk/submenu2" },
          ]}
        />
        <DropdownMenu
          icon={faDatabase}
          label="Pusat Data"
          isActive={isActive("/pusatdata")}
          items={[
            { label: "Pengguna", path: "/pusatdata" },
          ]}
        />
        <DropdownMenu
          icon={faWarehouse}
          label="Gudang"
          isActive={isActive("/gudang")}
          items={[
            { label: "Lokasi Gudang", path: "/gudang" },
          ]}
        />
        <SidebarItem
          icon={faFileAlt}
          label="Laporan"
          path="/laporan"
          isActive={isActive("/laporan")}
          items={[
            { label: "Produk", path: "/laporan" },
          ]}
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

function DropdownMenu({ icon, label, isActive, items }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div>
      <div
        className={`h-[58.02px] py-[5px] flex justify-start items-center pl-5 pr-4 py-[13.51px] cursor-pointer ${
          isActive ? "bg-[#457468]/40 border-l-4 border-[#16423c]" : ""
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

      {/* Render submenu items when open */}
      {isOpen && (
        <div className="pl-12 bg-[#f4f7fb]">
          {items.map((item) => (
            <SidebarItem
              key={item.path}
              icon={icon}
              label={item.label}
              path={item.path}
              isActive={isActive}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Newsidebar;
