import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faBox,
  faDatabase,
  faWarehouse,
  faFileAlt,
  faCogs,
  faChevronDown,
  faSignOutAlt, 
} from "@fortawesome/free-solid-svg-icons";

// Impor gambar logo
import Logo from "../assets/logodark.png"; // Sesuaikan path sesuai lokasi gambar

function Newsidebar() {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState(localStorage.getItem('role') || '');
  const [showLogoutModal, setShowLogoutModal] = useState(false);  
  const location = useLocation();
  const navigate = useNavigate();  

  const isActive = (path) => location.pathname.startsWith(path);

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
  

  const handleLogout = () => {
    setShowLogoutModal(false);
    localStorage.removeItem('userId');
    navigate('/login');
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

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
        <DropdownMenu
          icon={faBox}
          label="Produk"
          isActive={isActive("/produk") || isActive("/keluarmasuk")} // DropdownMenu aktif jika salah satu path aktif
          items={[
            { 
              label: "Daftar Produk", 
              path: "/produk"
            },
            { 
              label: "Stock Management", 
              path: "/keluarmasuk"
            },
          ]}
        />

        <DropdownMenu
          icon={faDatabase}
          label="Pusat Data"
          isActive={isActive("/pusatdata")}
          items={[{ label: "Pengguna", path: "/pusatdata" }]}
        />
        <DropdownMenu
          icon={faWarehouse}
          label="Gudang"
          isActive={isActive("/gudang")}
          items={[{ label: "Lokasi Gudang", path: "/gudang" }]}
        />
        <SidebarItem
          icon={faFileAlt}
          label="Laporan"
          path="/laporan"
          isActive={isActive("/laporan")}
        />
        <SidebarItem
          icon={faCogs}
          label="Pengaturan"
          path="/editprofile"
          isActive={isActive("/editprofile")}
        />
        
        {/* Tombol Logout */}
        <div className="absolute bottom-4 w-full">
          <div
            className="h-[58.02px] py-[5px] flex justify-start items-center pl-5 pr-4 py-[13.51px] cursor-pointer"
            onClick={() => setShowLogoutModal(true)} 
          >
            <div className="w-10 flex justify-start items-center">
              <FontAwesomeIcon
                icon={faSignOutAlt}
                className="text-sm text-[#2f6d64]"
              />
            </div>
            <div className="text-sm font-normal text-[#2f6d64]">
              Logout
            </div>
          </div>
        </div>
      </div>

      {/* Modal Konfirmasi Logout */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-72">
            <div className="text-lg font-semibold mb-4">Apakah Anda yakin ingin keluar?</div>
            <div className="flex justify-center">
              <button
                className="bg-[#457468] text-white px-4 py-2 rounded-lg mr-2"
                onClick={handleLogout}
              >
                Yes
              </button>
              <button
                className="bg-[#e1e1e1] text-[#2f6d64] px-4 py-2 rounded-lg"
                onClick={cancelLogout}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
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
          className={`text-sm font-normal ${
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
            <div
              key={item.path}
              className={`h-[58.02px] py-[5px] flex justify-start items-center pl-5 pr-4 py-[13.51px] ${
                isActive ? "bg-[#457468]/40" : ""
              }`}
            >
              <Link
                to={item.path}
                className={`text-sm font-normal leading-[21px] ${
                  isActive ? "text-[#16423c]" : "text-[#2f6d64]"
                }`}
              >
                {item.label}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Newsidebar;
