import React from "react";
import Newsidebar from "../components/NewSidebar"; // Sidebar yang sudah terpisah
import Navbar from "../components/Navbar";
import SidebarMenu from "../components/SidebarMenu";
import VerificationCard from "../components/VerificationCard";
import { Link } from "react-router-dom";
import ReminderTable from "../components/ReminderTable";

function Kedaluarsa() {
  // Data dummy untuk tabel
  const currentReminders = [
    { id: 1, name: "Pengingat 1", lastUpdated: "2024-11-10", updatedBy: "Admin", selectedProduct: "Produk A" },
    { id: 2, name: "Pengingat 2", lastUpdated: "2024-11-08", updatedBy: "Admin", selectedProduct: "Produk B" },
  ];

  return (
    <div className="flex h-[920px] bg-gray-100">
      {/* Sidebar */}
      <Newsidebar />
      {/* Main Content */}
      <div className="flex-1">
        <Navbar />
        <div className="flex">
          {/* Left Side: Menu Edit Profile */}
          <div className="w-1/4 py-10 mr-6">
            <SidebarMenu />
            {/* Verifikasi Akun */}
            <VerificationCard />
          </div>

          {/* Right Side: Form and Cards */}
          <div className="flex-1 mr-8">
            <ReminderTable reminders={currentReminders} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Kedaluarsa;
