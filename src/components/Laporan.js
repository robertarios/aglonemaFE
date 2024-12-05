import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaSearch, FaCalendarAlt, FaDownload } from "react-icons/fa";

const LaporanPage = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);  

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/stock/report");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setReportData(data.data);  
        setLoading(false);  
      } catch (err) {
        setError(err.message);  
        setLoading(false);
      }
    };

    fetchReportData();
  }, []); 

  const handleSearch = (e) => {
    setSearchTerm(e.target.value); 
  };

  const filteredData = reportData.filter(item => {
    // Check if searchTerm is provided, and if so, filter based on SKU or product name
    const nameMatch = item.namaProduk && item.namaProduk.toLowerCase().includes(searchTerm.toLowerCase());
    const skuMatch = item.sku && item.sku.toLowerCase().includes(searchTerm.toLowerCase());

    // Include the item if it matches either the product name or SKU
    return !searchTerm || nameMatch || skuMatch;
  });

  const toggleDatePicker = () => {
    setIsDatePickerVisible(!isDatePickerVisible);
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    setIsDatePickerVisible(false); 
  };

  const downloadCSV = () => {
    const filteredDataForCSV = reportData.filter((item) => {
      const dateInRange = !startDate || !endDate || (new Date(item.date) >= startDate && new Date(item.date) <= endDate);
      const matchesSearchTerm = !searchTerm || 
                                (item.nama && item.nama.toLowerCase().includes(searchTerm.toLowerCase())) ||
                                (item.sku && item.sku.toLowerCase().includes(searchTerm.toLowerCase()));
      return dateInRange && matchesSearchTerm;
    });

    const csvHeaders = "No.,Kode SKU,Nama Produk,In,Out,Stok,Date\n";
    const csvRows = filteredDataForCSV
      .map((item, index) =>
        [
          index + 1, // Index + 1 untuk nomor urut
          item.sku,
          item.nama,
          item.in,
          item.out,
          item.stok,
          item.date,
        ].join(",")
      )
      .join("\n");

    const csvData = csvHeaders + csvRows;

    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 bg-white-100 min-h-screen space-y-6">
      <h2 className="text-lg font-bold text-[#272d3b] mb-4 text-left relative">
        Stok Produk
      </h2>
      <hr className="border-t border-[#e0e0e0] mb-4" />

      <div className="flex justify-between items-center mt-4 lg:mt-0">
        <div className="flex flex-col lg:flex-row items-start space-y-4 lg:space-y-0 lg:space-x-4 w-3/5">
          <div className="relative w-full lg:w-1/2">
            <span className="absolute inset-y-0 h-full left-0 flex items-center pl-3 text-gray-500">
              <FaSearch />
            </span>
            <input
              type="text"
              placeholder="Cari Produk..."
              className="w-full pl-10 p-2 border border-gray-500 rounded-full"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

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

        <button
          onClick={downloadCSV}
          className="flex items-center bg-green-800 text-white p-2 rounded-full shadow-md"
        >
          <FaDownload className="mr-2" />
          <span>Download</span>
        </button>
      </div>

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

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-100 text-black text-left">
                <th className="py-3 px-6 font-semibold text-center text-[18px] w-32">No.</th>
                <th className="py-3 px-6 font-semibold text-center text-[18px] w-32">Kode SKU</th>
                <th className="py-3 px-6 font-semibold text-center text-[18px] w-64">Nama Produk</th>
                <th className="py-3 px-6 font-semibold text-center text-[18px] w-32">Stok Masuk</th>
                <th className="py-3 px-6 font-semibold text-center text-[18px] w-32">Stok Keluar</th>
                <th className="py-3 px-6 font-semibold text-center text-[18px] w-32">Jumlah Stok</th>
                <th className="py-3 px-6 font-semibold text-center text-[18px] w-32">Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={item.nomor} className="border-b">
                  <td className="py-4 px-6 text-center">{index + 1}</td> {/* Nomor urut berdasarkan index + 1 */}
                  <td className="py-4 px-6 text-center">{item.kodeSKU}</td>
                  <td className="py-4 px-6 text-center">{item.namaProduk}</td>
                  <td className="py-4 px-6 text-center">{item.in}</td>
                  <td className="py-4 px-6 text-center">{item.out}</td>
                  <td className="py-4 px-6 text-center">{item.stock}</td>
                  <td className="py-4 px-6 text-center">{item.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LaporanPage;
