import React, { useState } from "react";
import Newsidebar from "../components/NewSidebar";
import Navbar from "../components/Navbar";
import {
  FaCheck,
  FaChartLine,
  FaCog,
  FaSearch,
  FaHistory,
  FaPlus,
} from "react-icons/fa";

const PusatData = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Data Pusat Data (Contoh Data)
  const data = [
    {
      id: "25509",
      name: "John Doe",
      email: "john.doe@example.com",
      accessLevel: "Admin",
      dataCenter: "Pusat Data A",
    },
  ];

  // Filter data berdasarkan pencarian
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Pagination buttons
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredData.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle download data as CSV
  const downloadCSV = () => {
    const csvData =
      "ID,Name,Email,Access Level,Pusat Data\n" +
      data
        .map(
          (item) =>
            `${item.id},${item.name},${item.email},${item.accessLevel},${item.dataCenter}`
        )
        .join("\n");
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.csv";
    a.click();
  };

  return (
    <div className="flex bg-[#FAFAFA]">
      <Newsidebar />
      <div className="flex-1 flex flex-col bg-[#FAFAFA]">
        <Navbar />
        <div className="p-6 h-screen">
          <h2 className="text-lg font-bold text-[#272d3b] mb-4 text-left relative">
            Daftar Pengguna
          </h2>

          <hr className="border-t border-[#e0e0e0] mb-4" />
          <div className="flex justify-between items-center mb-4">
            <div className="relative w-1/4">
              <span className="absolute inset-y-0 h-full left-0 flex items-center pl-3 mt-1 text-gray-500">
                <FaSearch />
              </span>
              <input
                type="text"
                placeholder="Cari Pengguna..."
                className="w-full pl-10 p-2 mt-3 border border-gray-500 rounded-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-[#467469] p-2 font-semibold rounded">
                <FaHistory className="mr-2 text-black" /> History Data
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th
                    colSpan="5"
                    className="text-left py-4 px-6 text-black font-semibold"
                  >
                    Pusat Data Pengguna
                  </th>
                  <th className="py-4 px-6 text-gray-500">
                    <div className="flex justify-end">
                      <button className="bg-[#467469] text-white p-3 rounded-full flex items-center">
                        <FaPlus className="mr-2" /> Tambah Pengguna
                      </button>
                    </div>
                  </th>
                </tr>
              </thead>

              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-6 text-gray-500 font-semibold">
                    ID
                  </th>
                  <th className="text-left py-4 px-6 text-gray-500 font-semibold">
                    Nama
                  </th>
                  <th className="text-left py-4 px-6 text-gray-500 font-semibold">
                    Email
                  </th>
                  <th className="text-left py-4 px-6 text-gray-500 font-semibold">
                    Hak Akses
                  </th>
                  <th className="text-left py-4 px-6 text-gray-500 font-semibold">
                    Pusat Data
                  </th>
                  <th className="text-right py-4 px-6 text-gray-500 font-semibold">
                    <p className="mr-10">Aksi</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentData.length > 0 ? (
                  currentData.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="py-4 text-left px-6">{item.id}</td>
                      <td className="py-4 text-left px-6">{item.name}</td>
                      <td className="py-4 text-left px-6">{item.email}</td>
                      <td className="py-4 text-left px-6">
                        {item.accessLevel}
                      </td>
                      <td className="py-4 text-left px-6">{item.dataCenter}</td>
                      <td className="py-4 text-right pr-8 px-6">
                        <button className="bg-gray-300 text-black p-2 rounded mr-8">
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
                        <div className="text-gray-700 text-lg font-medium">
                          Tidak Ada Data
                        </div>
                        <ul className="text-gray-500 text-sm mt-2 space-y-1">
                          <li className="flex items-center">
                            <FaCheck className="mr-2 text-green-600" /> Tidak
                            ada data pengguna yang ditemukan
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="flex justify-end mt-4">
              <div className="flex items-center space-x-1">
                <button className="px-3 py-1 bg-gray-200 text-gray-500 rounded-l">
                  «
                </button>
                <button className="px-3 py-1 bg-gray-200 text-gray-500">
                  ‹
                </button>
                <button className="px-3 py-1 bg-green-800 text-white">
                  {currentPage}
                </button>
                <button className="px-3 py-1 bg-gray-200 text-gray-500">
                  ›
                </button>
                <button className="px-3 py-1 bg-gray-200 text-gray-500 rounded-r">
                  »
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PusatData;
