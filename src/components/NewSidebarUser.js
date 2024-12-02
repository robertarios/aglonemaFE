import React, { useState, useEffect } from "react";
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

function NewsidebarUser() {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState(localStorage.getItem('role') || '');
  const [showLogoutModal, setShowLogoutModal] = useState(false);  
  const location = useLocation();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    console.log('userId from localStorage:', userId); // Debug log
    if (userId) {
      fetch(`http://localhost:5000/api/users/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log('User data fetched:', data); // Debug log
          if (data.name) {
            setUsername(data.name);
          }
          if (role) { 
            setRole(role); // Set role di state
          }
        })
        .catch((error) => console.error('Error fetching user:', error));
    }
  }, []);

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="w-64 h-screen bg-[#EDF3FF] shadow flex-col justify-start items-start">
      {/* Logo */}
      <div className="px-4 py-4 bg-[#edf3ff] flex justify-center items-center">
        <img className="relative left-0 top-0" src={Logo} alt="Logo" />
      </div>

      {/* Sidebar Menu */}
      <div className="h-screen bg-[#EDF3FF]">
      <div className="pt-6 pb-8 flex flex-col justify-start items-start pl-5 pr-4 py-[13.51px] bg-[#DAE6FF]">
        <div className="text-sm font-normal leading-[21px]">
          {username}
        </div>
        <div className="text-sm font-normal text-[#2f6d64] leading-[21px]">
          {role}
        </div>
      </div>

        <SidebarItem
          icon={faTachometerAlt}
          label="Dashboard"
          path="/dashboard"
          isActive={isActive("/dashboard")}
        />
        <SidebarItem
          icon={faFileAlt}
          label="Laporan"
          path="/laporan"
          isActive={isActive("/laporan")}
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
        {icon && (
          <div className="w-10 flex justify-start items-center">
            <FontAwesomeIcon
              icon={icon}
              className={`text-sm ${
                isActive ? "text-[#16423c]" : "text-[#2f6d64]"
              }`}
            />
          </div>
        )}
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

export default NewsidebarUser;
