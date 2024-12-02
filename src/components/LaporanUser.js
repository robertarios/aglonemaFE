import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  FaSearch,
  FaCalendarAlt,
  FaDownload,
  FaChartLine,
  FaCheck,
} from "react-icons/fa";

const LaporanUser = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleDatePicker = () => {
    setIsDatePickerVisible(!isDatePickerVisible);
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    setIsDatePickerVisible(false); // Close DatePicker after selecting
  };

  const downloadCSV = () => {
    const csvHeaders = "No.,Kode SKU,Nama Produk,In,Out,Stok\n";
    const csvRows = filteredData
      .map((item) =>
        [
          item.no,
          item.sku,
          item.nama,
          item.in,
          item.out,
          item.stok,
        ].join(",")
      )
      .join("\n");
    const csvData = csvHeaders + csvRows;

    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "laporan_stok.csv";
    a.click();
    URL.revokeObjectURL(url); // Revoke URL after download
  };

  // Dummy data for the table
  const dummyData = [
    { no: 1, sku: "SKU001", nama: "Produk A", in: 50, out: 20, stok: 30 },
    { no: 2, sku: "SKU002", nama: "Produk B", in: 30, out: 10, stok: 20 },
    { no: 3, sku: "SKU003", nama: "Produk C", in: 100, out: 70, stok: 30 },
    { no: 4, sku: "SKU004", nama: "Produk D", in: 60, out: 30, stok: 30 },
    { no: 5, sku: "SKU005", nama: "Produk E", in: 80, out: 50, stok: 30 },
  ];

  // Filter data based on search term
  const filteredData = dummyData.filter((item) =>
    item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">
      {/* Header Section */}
      <h2 className="text-lg font-bold text-[#272d3b] mb-4 text-left relative">
        Stok Produk
      </h2>
      <hr className="border-t border-[#e0e0e0] mb-4" />

      {/* Filter and Actions */}
      <div className="flex justify-between items-center mt-4 lg:mt-0">
        <div className="flex flex-col lg:flex-row items-start space-y-4 lg:space-y-0 lg:space-x-4 w-3/5">
          {/* Search Bar */}
          <div className="relative w-full lg:w-1/2">
            <span className="absolute inset-y-0 h-full left-0 flex items-center pl-3 text-gray-500">
              <FaSearch />
            </span>
            <input
              type="text"
              placeholder="Cari SKU atau Produk..."
              className="w-full pl-10 p-2 border border-gray-500 rounded-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Date Filter */}
          <div
            className="flex items-center bg-[#EDF3FF] p-3 rounded-full shadow-md flex-shrink-0 w-full lg:w-auto cursor-pointer"
            onClick={toggleDatePicker}
          >
            <FaCalendarAlt className="text-gray-500 mx-2" />
            <span className="text-gray-700 text-sm">
              {startDate && endDate
                ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
                : "Pilih Tanggal"}
            </span>
          </div>
        </div>

        {/* Download Button - Positioned to the right */}
        <button
          onClick={downloadCSV}
          className="flex items-center bg-green-800 text-white p-2 rounded-full shadow-md"
        >
          <FaDownload className="mr-2" />
          <span>Download</span>
        </button>
      </div>

      {/* Date Picker Popup */}
      {isDatePickerVisible && (
        <div className="absolute z-50 mt-2 bg-white p-4 shadow-md rounded-lg">
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
          />
        </div>
      )}

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-4 px-6 text-gray-500 font-semibold">
                No.
              </th>
              <th className="text-left py-4 px-6 text-gray-500 font-semibold">
                Kode SKU
              </th>
              <th className="text-left py-4 px-6 text-gray-500 font-semibold">
                Nama Produk
              </th>
              <th className="text-left py-4 px-6 text-gray-500 font-semibold">
                In
              </th>
              <th className="text-left py-4 px-6 text-gray-500 font-semibold">
                Out
              </th>
              <th className="text-left py-4 px-6 text-gray-500 font-semibold">
                Stok
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-4 px-6">{item.no}</td>
                <td className="py-4 px-6">{item.sku}</td>
                <td className="py-4 px-6">{item.nama}</td>
                <td className="py-4 px-6">{item.in}</td>
                <td className="py-4 px-6">{item.out}</td>
                <td className="py-4 px-6">{item.stok}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-end mt-4">
          <div className="flex items-center space-x-1">
            <button className="px-3 py-1 bg-gray-200 text-gray-500 rounded-l">
              «
            </button>
            <button className="px-3 py-1 bg-gray-200 text-gray-500">‹</button>
            <button className="px-3 py-1 bg-green-800 text-white">1</button>
            <button className="px-3 py-1 bg-gray-200 text-gray-500">›</button>
            <button className="px-3 py-1 bg-gray-200 text-gray-500 rounded-r">
              »
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaporanUser;
