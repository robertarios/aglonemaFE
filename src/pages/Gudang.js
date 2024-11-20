import React, { useState, useEffect } from "react";
import Newsidebar from "../components/NewSidebar";
import Navbar from "../components/Navbar";
import AddWarehouse from "../components/AddWarehouse";
import WarehouseForm from "./WarehouseForm";
import {
  FaCheck,
  FaChartLine,
  FaCog,
  FaSearch,
  FaDownload,
  FaHistory,
  FaPlus,
} from "react-icons/fa";

const Warehouse = () => {
  const [search, setSearch] = useState("");
  const [warehouses, setWarehouses] = useState([]);
  const [isAddWarehouseVisible, setIsAddWarehouseVisible] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    // Fetch warehouse data from API
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/api/gudang");
      const data = await response.json();
      setWarehouses(data);
    };
    fetchData();
  }, []);

  const toggleAddWarehouseModal = () => {
    setIsAddWarehouseVisible(!isAddWarehouseVisible);
  };

  const addNewWarehouse = (newWarehouse) => {
    setWarehouses([...warehouses, newWarehouse]);
  };

  const openForm = (warehouse) => {
    setSelectedWarehouse(warehouse);
    setIsFormVisible(true);
  };

  const closeForm = () => {
    setIsFormVisible(false);
    setSelectedWarehouse(null);
  };

  const handleSave = (updatedWarehouse) => {
    setWarehouses((prev) =>
      prev.map((wh) => (wh.id === updatedWarehouse.id ? updatedWarehouse : wh))
    );
    closeForm();
  };

  const handleDelete = (id) => {
    setWarehouses((prev) => prev.filter((wh) => wh.id !== id));
    closeForm();
  };

  const filteredWarehouses = warehouses.filter((warehouse) =>
    warehouse.name.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentWarehouses = filteredWarehouses.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredWarehouses.length / itemsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const downloadCSV = () => {
    const csvData =
      "ID,Name,Address,Detail\n" +
      warehouses
        .map((wh) => `${wh.id},${wh.name},${wh.address},${wh.detail}`)
        .join("\n");
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "warehouses.csv";
    a.click();
  };

  return (
    <div className="flex bg-[#FAFAFA]">
      <Newsidebar />
      <div className="flex-1 flex flex-col bg-[#FAFAFA]">
        <Navbar />
        <div className="p-6 h-screen">
          <div className="flex justify-between items-center mb-4">
            <div className="relative w-1/4">
              <span className="absolute inset-y-0 h-full left-0 flex items-center pl-3 mt-1 text-gray-500">
                <FaSearch />
              </span>
              <input
                type="text"
                placeholder="Cari Gudang..."
                className="w-full pl-10 p-2 mt-3 border border-gray-500 rounded-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={downloadCSV}
                className="flex items-center text-[#467469] p-2 font-semibold"
              >
                <FaDownload className="mr-2 text-black" /> Export Data
              </button>
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
                    colSpan="4"
                    className="text-left py-4 px-6 text-black font-semibold"
                  >
                    Lokasi Gudang
                  </th>
                  <th className="py-4 px-6 text-gray-500">
                    <div className="flex justify-end">
                      <button
                        className="bg-[#467469] text-white p-3 rounded-full flex items-center"
                        onClick={toggleAddWarehouseModal}
                      >
                        <FaPlus className="mr-2" /> Tambah Gudang
                      </button>
                    </div>
                  </th>
                </tr>
              </thead>

              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-6 text-gray-500 font-semibold">
                    Gudang ID
                  </th>
                  <th className="text-left py-4 px-6 text-gray-500 font-semibold">
                    Nama Gudang
                  </th>
                  <th className="text-left py-4 px-6 text-gray-500 font-semibold">
                    Alamat
                  </th>
                  <th className="text-left py-4 px-6 text-gray-500 font-semibold">
                    Rincian Alamat
                  </th>
                  <th className="text-center py-4 px-6 text-gray-500 font-semibold">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentWarehouses.length > 0 ? (
                  currentWarehouses.map((warehouse) => (
                    <tr key={warehouse.id} className="border-b">
                      <td className="py-4 text-left px-6">{warehouse.id}</td>
                      <td className="py-4 text-left px-6">{warehouse.name}</td>
                      <td className="py-4 text-left px-6">
                        {warehouse.address}
                      </td>
                      <td className="py-4 text-left px-6">
                        <a
                          href={`https://www.google.com/maps/search/?q=${encodeURIComponent(
                            warehouse.detail
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          Cek Maps
                        </a>
                      </td>

                      <td className="py-4 text-center px-6">
                        <button
                          className="bg-gray-500 text-white p-2 rounded ml-2"
                          onClick={() => openForm(warehouse)}
                        >
                          <FaCog />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-8 text-center">
                      <div className="flex flex-col items-center">
                        <FaChartLine className="text-5xl text-blue-500 mb-2" />
                        <div className="text-gray-700 text-lg font-medium">
                          Laporan Stok Gudang
                        </div>
                        <ul className="text-gray-500 text-sm mt-2 space-y-1">
                          <li className="flex items-center">
                            <FaCheck className="mr-2 text-green-600" /> Tidak
                            ada gudang yang ditemukan
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
      {isAddWarehouseVisible && (
        <AddWarehouse
          onClose={toggleAddWarehouseModal}
          onSave={addNewWarehouse}
        />
      )}
      {isFormVisible && (
        <WarehouseForm
          warehouse={selectedWarehouse}
          onClose={closeForm}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Warehouse;
