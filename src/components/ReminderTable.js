import React from "react";
import { FaCheck, FaChartLine, FaCog, FaPlus } from "react-icons/fa";

const ReminderTable = ({ reminders }) => (
  <div className="bg-white rounded-lg shadow-md p-6 mt-10 pb-6">
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b">
          <th colSpan="4" className="text-left py-4 px-6 text-black text-xl font-semibold">
            Pengaturan Kedaluarsa
          </th>
          <th className="py-4 px-6 text-gray-500">
            <div className="flex justify-end">
              <button className="bg-[#467469] text-white p-3 rounded-full text-sm flex items-center">
                <FaPlus className="mr-2" /> Tambah Pengingat
              </button>
            </div>
          </th>
        </tr>
      </thead>
      <thead>
        <tr className="border-b">
          <th className="text-left py-4 px-6 text-gray-500 font-semibold">Nama Pengingat</th>
          <th className="text-left py-4 px-6 text-gray-500 font-semibold">Terakhir Diupdate</th>
          <th className="text-left py-4 px-6 text-gray-500 font-semibold">Diupdate Oleh</th>
          <th className="text-left py-4 px-6 text-gray-500 font-semibold">Produk Terpilih</th>
          <th className="text-center py-4 px-6 text-gray-500 font-semibold">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {reminders.length > 0 ? (
          reminders.map((reminder) => (
            <tr key={reminder.id} className="border-b pb-3">
              <td className="py-4 text-left px-6">{reminder.name}</td>
              <td className="py-4 text-left px-6">{reminder.lastUpdated}</td>
              <td className="py-4 text-left px-6">{reminder.updatedBy}</td>
              <td className="py-4 text-left px-6">{reminder.selectedProduct}</td>
              <td className="py-4 text-center px-6">
                <button className="bg-gray-500 text-white p-2 rounded ml-2">
                  <FaCog />
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="py-8 text-center">
              <div className="flex flex-col items-center">
                <FaChartLine className="text-5xl text-blue-500 mb-2" />
                <div className="text-gray-700 text-lg font-medium">Laporan Kedaluarsa</div>
                <ul className="text-gray-500 text-sm mt-2 space-y-1">
                  <li className="flex items-center">
                    <FaCheck className="mr-2 text-green-600" /> Tidak ada pengingat kedaluarsa ditemukan
                  </li>
                </ul>
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default ReminderTable;