// SidebarMenu.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const SidebarMenu = () => {
  return (
    <ul className="text-left">
      <li className="mx-8 p-3 text-start">
        <NavLink 
          to="/editprofile" 
          className={({ isActive }) => 
            `pl-4 text-[#2f6d64] ${isActive ? 'bg-white border-l-4 border-[#2f6d64] py-4 px-32' : ''}`
          }
        >
          Edit Profile
        </NavLink>
      </li>
      <li className="mx-8 p-3 text-start">
        <NavLink 
          to="/spesifikasi-tambahan" 
          className={({ isActive }) => 
            `pl-4 text-[#2f6d64] ${isActive ? 'bg-white border-l-4 border-[#2f6d64] py-4 px-16' : ''}`
          }
        >
          Spesifikasi Tambahan
        </NavLink>
      </li>
      <li className="mx-8 p-3 text-start">
        <NavLink 
          to="/kedaluarsa" 
          className={({ isActive }) => 
            `pl-4 text-[#2f6d64] ${isActive ? 'bg-white border-l-4 border-[#2f6d64] py-4 px-16' : ''}`
          }
        >
          Pengaturan Kedaluarsa
        </NavLink>
      </li>
      <li className="mx-8 p-3 text-start">
        <NavLink 
          to="/ubah-kata-sandi" 
          className={({ isActive }) => 
            `pl-4 py-8 text-[#2f6d64] ${isActive ? 'bg-white border-l-4 border-[#2f6d64] py-4 px-16' : ''}`
          }
        >
          Ubah Kata Sandi
        </NavLink>
      </li>
      <li className="mx-8 p-3 text-start">
        <NavLink 
          to="/reset-data" 
          className={({ isActive }) => 
            `pl-4 text-[#2f6d64] ${isActive ? 'bg-white border-l-4 border-[#2f6d64] py-4 px-16' : ''}`
          }
        >
          Reset Data
        </NavLink>
      </li>
    </ul>
  );
};

export default SidebarMenu;
