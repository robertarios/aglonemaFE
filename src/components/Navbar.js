import React, { useState, useEffect } from "react";
import { FaBars, FaBell, FaQuestionCircle, FaTimes } from "react-icons/fa";
import { HiChevronDown } from "react-icons/hi";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const [username, setUsername] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk modal notifikasi
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false); // State untuk modal bantuan
  const [notifications, setNotifications] = useState([]); // State untuk notifikasi
  const location = useLocation();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      fetch(`http://localhost:5000/api/users/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.name) {
            setUsername(data.name);
          }
        })
        .catch((error) => console.error("Error fetching user:", error));
    }

    // Seed notifikasi dengan status isRead
    setNotifications([
      { id: 1, title: "Peringatan: Produk Mangga Mendekati Kadaluarsa!", description: "Produk Mangga akan kadaluarsa dalam 2 hari. Segera lakukan pengecekan dan pastikan stok yang mendekati kadaluarsa ditangani", isRead: false },
      { id: 2, title: "Peringatan: Produk Apel Mendekati Kadaluarsa!", description: "Produk Apel akan kadaluarsa dalam 4 hari. Segera lakukan pengecekan dan pastikan stok yang mendekati kadaluarsa ditangani", isRead: false },
      { id: 3, title: "Peringatan: Produk Jeruk Bali Mendekati Kadaluarsa!", description: "Produk Jeruk akan kadaluarsa dalam 4 hari. Segera lakukan pengecekan dan pastikan stok yang mendekati kadaluarsa ditangani", isRead: true }, // Sudah dibaca
    ]);
  }, []);

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
      case "/kedaluarsa":
        return "Pengaturan";
      case "/pusatdata":
        return "Pusat Data";
      default:
        return "Dashboard";
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen); // Toggle modal notifikasi
  };

  const toggleHelpModal = () => {
    setIsHelpModalOpen(!isHelpModalOpen); // Toggle modal bantuan
  };

  // Fungsi untuk menandai notifikasi sebagai dibaca
  const markAsRead = (id) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, isRead: true } : notification
    ));
  };

  return (
    <div className="flex items-center justify-between px-8 py-6 bg-white shadow-md relative">
      {/* Left Side - Hamburger Icon and Page Title */}
      <div className="flex items-center">
        <FaBars className="text-gray-700 mr-3 cursor-pointer" />
        <span className="text-lg font-medium text-gray-700">{getPageTitle()}</span>
      </div>

      {/* Right Side - User Dropdown, Help, and Notification Icons */}
      <div className="flex items-center space-x-6">
        {/* User Dropdown */}
        <div className="flex items-center cursor-pointer">
          <span className="text-gray-700">{username}</span>
          <HiChevronDown className="text-gray-700 ml-1" />
        </div>

        {/* Help Icon */}
        <div className="cursor-pointer" onClick={toggleHelpModal}>
          <FaQuestionCircle className="text-gray-700 text-2xl" /> {/* Tambahkan class text-2xl */}
        </div>


        {/* Notification Icon */}
        <div className="cursor-pointer relative flex items-center" onClick={toggleModal}>
          <FaBell className="text-gray-700 text-2xl" /> {/* Ukuran lonceng lebih besar */}
          {/* Badge untuk jumlah notifikasi baru */}
          {notifications.filter(notification => !notification.isRead).length > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center translate-x-1/2 -translate-y-1/2">
              {notifications.filter(notification => !notification.isRead).length}
            </span>
          )}
        </div>
      </div>

      {/* Modal Notifikasi */}
      {isModalOpen && (
        <div className="absolute top-16 right-8 bg-white shadow-lg rounded-md w-80 p-4 border border-gray-200 z-10">
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-gray-700 text-left">Notifikasi</h4>
            <button onClick={toggleModal} className="text-gray-400 hover:text-gray-600">
              <FaTimes />
            </button>
          </div>
          <ul className="mt-2">
            {notifications.map((notification) => (
              <li 
                key={notification.id} 
                className="flex items-start space-x-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                onClick={() => markAsRead(notification.id)} // Menandai notifikasi sebagai dibaca
              >
                {/* Dot Biru untuk notifikasi yang belum dibaca */}
                {!notification.isRead && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
                
                {/* Isi notifikasi */}
                <div className="flex flex-col text-left">
                  <span className={`text-sm font-semibold ${notification.isRead ? "text-gray-400" : "text-gray-700"}`}>
                    {notification.title}
                  </span>
                  <span className="text-xs text-gray-500">{notification.description}</span>
                </div>
              </li>
            ))}
          </ul>
          {notifications.length === 0 && (
            <p className="text-gray-500 text-center mt-4">Tidak ada notifikasi.</p>
          )}
        </div>
      )}

      {/* Modal Bantuan */}
      {isHelpModalOpen && (
        <div className="absolute top-16 right-8 bg-white shadow-lg rounded-md w-80 p-4 border border-gray-200 z-10">
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-gray-700 text-left">Bantuan</h4>
            <button onClick={toggleHelpModal} className="text-gray-400 hover:text-gray-600">
              <FaTimes />
            </button>
          </div>
          <p className="text-gray-700 mt-2 text-left">Untuk mengetahui cara menggunakan fitur manajemen gudang, silakan ikuti petunjuk berikut:</p>
          <ul className="mt-4 space-y-2 text-left text-sm text-gray-600">
            <li>1. Klik pada halaman Gudang untuk melihat daftar produk.</li>
            <li>2. Periksa masa kadaluarsa produk yang ada di gudang.</li>
            <li>3. Ikuti langkah-langkah pada setiap produk untuk melakukan tindakan yang diperlukan.</li>
          </ul>
          <button 
            className="mt-4 border border-[#44746c] text-[#44746c] px-4 py-2 rounded-md w-full hover:bg-[#44746c] hover:text-white transition duration-300"
            onClick={() => window.open("/petunjuk-manajemen-gudang")}
          >
            Lihat Panduan Lengkap
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
