import React from 'react';
import logo from '../assets/logo.png';

function Nav() {
  return (
    <div className="relative fixed w-full">
      <nav className="bg-[#42675D] px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="Aglostok Logo" className="h-10 mr-2" />
        </div>
        
        <div className="flex items-center space-x-6">
          {/* Navigation Links */}
          <ul className="flex space-x-6 text-white">
            <li>
              <a href="#products" className="hover:underline">
                Produk
              </a>
            </li>
            <li>
              <a href="#about" className="hover:underline">
                Tentang
              </a>
            </li>
          </ul>

          <button className="bg-white text-[#42675D] font-bold py-2 px-4 rounded-lg hover:bg-gray-100">
            Login
          </button>
          <button className="bg-[#2F4A3B] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#3b5b4a]">
            Sign Up
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
