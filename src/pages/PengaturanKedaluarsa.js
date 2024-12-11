import React, { useEffect, useState } from "react";
import axios from "axios";
import Newsidebar from "../components/NewSidebar"; // Sidebar yang sudah terpisah
import Navbar from "../components/Navbar";
import SidebarMenu from "../components/SidebarMenu";
import VerificationCard from "../components/VerificationCard";
import ReminderTable from "../components/ReminderTable";
import ReminderModal from "../components/ReminderModal";

function Kedaluarsa() {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReminder, setEditingReminder] = useState(null);

  // Fungsi untuk memuat data dari API
  const fetchReminders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/reminders");
      setReminders(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  const openModal = (reminder = null) => {
    setEditingReminder(reminder);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingReminder(null);
  };

  const handleSave = async () => {
    fetchReminders(); // Panggil ulang data dari server
    closeModal();
  };

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

          {/* Right Side: Table */}
          <div className="flex-1 mr-8">
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>Error: {error}</div>
            ) : (
              <ReminderTable
                reminders={reminders}
                setReminders={setReminders}
                openModal={openModal}
              />
            )}
          </div>
        </div>
      </div>

      {/* Modal Add/Edit */}
      <ReminderModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSave}
        reminderData={editingReminder}
      />
    </div>
  );
}

export default Kedaluarsa;
