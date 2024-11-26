import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const InOut = () => {
  const [stocks, setStocks] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false); // For the confirmation modal
  const itemsPerPage = 10;

  // Fetch stock data from backend
  const fetchStocks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      const updatedData = response.data.map((stock) => ({
        ...stock,
        addStock: 0,
        outStock: 0,
      }));
      setStocks(updatedData);
      setFilteredStocks(updatedData); // Initialize filtered data
    } catch (error) {
      console.error("Error fetching stocks:", error);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  // Filter stocks based on search input
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

  // Handle input changes for addStock and outStock
  const handleInputChange = (sku, field, value) => {
    setStocks((prevStocks) =>
      prevStocks.map((stock) =>
        stock.sku === sku ? { ...stock, [field]: Number(value) } : stock
      )
    );
  };

  // Save stock updates
  const handleSave = async () => {
    try {
      const updatedStocks = await Promise.all(
        stocks.map(async (stock) => {
          // Check if stock is updated
          if (stock.addStock > 0 || stock.outStock > 0) {
            const updatedStock = stock.stock + stock.addStock - stock.outStock;
  
            // Prevent negative stock
            if (updatedStock < 0) {
              throw new Error(`Stok tidak boleh negatif untuk produk: ${stock.name}`);
            }
  
            // Send PUT request to update the stock in the database
            await axios.put(`http://localhost:5000/api/products/${stock.sku}`, {
              stock: updatedStock, // Send updated stock
            });
  
            // Return updated stock for state update
            return {
              ...stock,
              stock: updatedStock, // Update stock value
              addStock: 0, // Reset addStock
              outStock: 0, // Reset outStock
            };
          }
          return stock; // No changes for unchanged stocks
        })
      );
  
      // Update frontend state with updated stocks
      setStocks(updatedStocks);
      setFilteredStocks(updatedStocks);
    } catch (error) {
      console.error("Error saving stock updates:", error);
      alert(error.message || "Terjadi kesalahan saat menyimpan perubahan stok.");
    }
  };


  // Pagination helpers
  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredStocks.slice(startIndex, endIndex);
  };

  const getTotalPages = () => Math.ceil(filteredStocks.length / itemsPerPage);

  const handlePageClick = (page) => setCurrentPage(page);

  // Open modal when the save button is clicked
  const handleSaveButtonClick = () => {
    setIsModalOpen(true);
  };

  // Confirm save action
  const confirmSave = () => {
    setIsModalOpen(false);
    handleSave(); // Proceed with saving changes
  };

  // Cancel save action
  const cancelSave = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-black-700 border-b-2">
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
                <th className="py-3 px-6 font-semibold text-left text-[18px] w-32">
                  SKU
                </th>
                <th className="py-3 px-6 font-semibold text-left text-[18px] w-64">
                  Nama Produk
                </th>
                <th className="py-3 px-1 font-semibold text-left text-[18px] w-24">
                  Stok Saat Ini
                </th>
                <th className="py-3 px-6 font-semibold text-left text-[18px] w-32">
                  Add Stok
                </th>
                <th className="py-3 px-6 font-semibold text-left text-[18px] w-32">
                  Out Stok
                </th>
                <th className="py-3 px-6 font-semibold text-left text-[18px] w-32">
                  Satuan
                </th>
                <th className="py-3 px-6 font-semibold text-left text-[18px] w-32">
                  Status
                </th>
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
                    <td className="py-3 px-6 text-left">{stock.unit}</td>
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
          onClick={handleSaveButtonClick}
          className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800"
        >
          Simpan
        </button>
      </div>

{/* Confirmation Modal */}
{isModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg shadow-md w-[400px]">
      <h2 className="text-lg font-medium text-center mb-6">
        Apakah Anda yakin ingin menyimpan perubahan?
      </h2>
      <div className="flex justify-center space-x-4">
        <button
          onClick={cancelSave}
          className="bg-gray-300 text-black px-6 py-2 rounded hover:bg-gray-400 transition"
        >
          Batal
        </button>
        <button
          onClick={confirmSave}
          className="bg-[#467469] text-white px-6 py-2 rounded hover:bg-[#3b5f59] transition"
        >
          Simpan
        </button>
      </div>
    </div>
  </div>
)}


    </div>
  );
};

export default InOut;
