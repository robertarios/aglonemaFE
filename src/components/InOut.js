import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const InOut = () => {
  const [stocks, setStocks] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mengambil data stok dari backend
  const fetchStocks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      const updatedData = response.data.map((stock) => ({
        ...stock,
        addStock: 0,
        outStock: 0,
      }));
      setStocks(updatedData);
      setFilteredStocks(updatedData); // Pastikan data awal ditampilkan
    } catch (error) {
      console.error("Error fetching stocks:", error);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  // Filter berdasarkan pencarian
  const applyFilter = () => {
    if (!searchKeyword.trim()) {
      setFilteredStocks(stocks);
      return;
    }

    const filtered = stocks.filter(
      (stock) =>
        stock.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        stock.sku.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    setFilteredStocks(filtered);
  };

  useEffect(() => {
    applyFilter();
  }, [stocks, searchKeyword]);

  // Fungsi untuk menyimpan stok (add atau out stock)
  const handleSave = async () => {
    try {
      await Promise.all(
        stocks.map(async (stock) => {
          const updatedStock = stock.stock + stock.addStock - stock.outStock;
          await axios.post("http://localhost:5000/api/stock/update-stock", {
            sku: stock.sku,
            addStock: stock.addStock,
            outStock: stock.outStock,
          });
          stock.stock = updatedStock;
          stock.addStock = 0;
          stock.outStock = 0;
        })
      );
      fetchStocks();
      alert("Stock updated successfully!");
    } catch (error) {
      console.error("Error updating stock:", error);
      alert("Failed to update stock.");
    }
  };

  // Fungsi untuk menangani input stok
  const handleInputChange = (sku, field, value) => {
    setStocks((prevStocks) =>
      prevStocks.map((stock) =>
        stock.sku === sku ? { ...stock, [field]: Number(value) } : stock
      )
    );
  };

  // Pagination helper
  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredStocks.slice(startIndex, endIndex);
  };

  const getTotalPages = () => Math.ceil(filteredStocks.length / itemsPerPage);

  const handlePageClick = (page) => setCurrentPage(page);

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-black-700 border-b-2 ">
          Keluar Masuk Produk
        </h1>
      </div>

      {/* Search Section */}
      <div className="flex items-center mb-4">
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Cari SKU atau produk..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-300"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <span className="absolute left-3 top-2.5 text-gray-400">
            <FontAwesomeIcon icon={faSearch} />
          </span>
        </div>
      </div>

      {/* Stock Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-100 text-black text-left">
                <th className="py-3 px-6 font-semibold text-left text-[18px] w-32">SKU</th>
                <th className="py-3 px-6 font-semibold text-left text-[18px] w-64">Nama Produk</th>
                <th className="py-3 px-1 font-semibold text-left text-[18px] w-24">Stok Saat Ini</th>
                <th className="py-3 px-6 font-semibold text-left text-[18px] w-32">
                  Add Stok
                </th>
                <th className="py-3 px-6 font-semibold text-left text-[18px] w-32">
                  Out Stok
                </th>
                <th className="py-3 px-6 font-semibold text-left text-[18px] w-32">
                  Add Satuan
                </th>
                <th className="py-3 px-6 font-semibold text-left text-[18px] w-32">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredStocks.length > 0 ? (
                getPaginatedData().map((stock) => (
                  <tr
                    key={stock.sku}
                    className="border-b border-gray-300 hover:bg-gray-50"
                  >
                    <td className="py-3 px-6 text-left">{stock.sku}</td>
                    <td className="py-3 px-6 text-left">{stock.name}</td>
                    <td className="py-3 px-6 text-left">{stock.stock}</td>
                    <td className="py-3 px-6 text-left">
                      <input
                        type="number"
                        value={stock.addStock}
                        onChange={(e) =>
                          handleInputChange(stock.sku, "addStock", e.target.value)
                        }
                        className="w-full px-2 py-1 border rounded"
                      />
                    </td>
                    <td className="py-3 px-6 text-left">
                      <input
                        type="number"
                        value={stock.outStock}
                        onChange={(e) =>
                          handleInputChange(stock.sku, "outStock", e.target.value)
                        }
                        className="w-full px-2 py-1 border rounded"
                      />
                    </td>
                    <td className="py-3 px-6 text-left">
                      <select className="w-full px-2 py-1 border rounded">
                        <option>Kg</option>
                        <option>Pcs</option>
                        <option>Box</option>
                      </select>
                    </td>
                    <td className="py-3 px-6 text-left">{stock.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    Data tidak ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>



      {/* Save Button */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleSave}
          className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800"
        >
          Simpan
        </button>
      </div>
    </div>
  );
};

export default InOut;
