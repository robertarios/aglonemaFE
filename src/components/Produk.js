import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  FaSearch,
  FaPlus,
  FaHistory,
  FaFileExcel,
  FaList,
  FaCheck,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

const Produk = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setShowDetailModal(true);
  };

  const getTotalPages = () => {
    return Math.ceil(filteredProducts.length / itemsPerPage);
  };

  const fetchWarehouses = async () => {
    try {
        const response = await axios.get("http://localhost:5000/api/gudang");
        setWarehouses(response.data);
    } catch (error) {
        console.error("Error fetching warehouses:", error);
    }
};

useEffect(() => {
  const fetchWarehouses = async () => {
      const response = await axios.get("http://localhost:5000/api/gudang");
      setWarehouses(response.data);
  };
  fetchWarehouses();
}, []);


  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const [newProduct, setNewProduct] = useState({
    id: "",
    sku: "",
    name: "",
    stock: 0,
    status: "",
    location: "", // Lokasi Gudang
    image: null, // Foto produk
  });
  const [editMode, setEditMode] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [stockFilter, setStockFilter] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  // Fungsi untuk mengambil data produk dari backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fungsi untuk menerapkan filter
  const applyFilter = () => {
    let filtered = products;

    if (searchKeyword) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter((product) => product.status === statusFilter);
    }

    if (stockFilter) {
      filtered = filtered.filter(
        (product) => product.stock <= parseInt(stockFilter, 10)
      );
    }

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    applyFilter();
  }, [products, statusFilter, stockFilter, searchKeyword]); // Tambahkan `products` di sini

  // Fungsi untuk menangani perubahan input pencarian
  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  // Menambah produk baru
  const handleAddProduct = async () => {
    const formData = new FormData();
    formData.append("sku", newProduct.sku);
    formData.append("name", newProduct.name);
    formData.append("stock", newProduct.stock);
    formData.append("status", newProduct.status);
    formData.append("location", selectedWarehouse); // Gunakan selectedWarehouse di sini
    if (newProduct.image) {
        formData.append("image", newProduct.image);
    }

    try {
        await axios.post("http://localhost:5000/api/products", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        fetchProducts();
        setShowModal(false);
        setNewProduct({ id: "", sku: "", name: "", stock: 0, status: "", location: "", image: null });
        setSelectedWarehouse(""); // Reset dropdown
    } catch (error) {
        console.error("Error adding product:", error);
    }
};



  // Mengatur produk untuk diedit
  const handleEditProduct = (product) => {
    setNewProduct(product);
    setEditMode(true);
    setShowModal(true);
  };

  // Memperbarui produk yang diedit
  const handleUpdateProduct = async () => {
    const formData = new FormData();
    formData.append("sku", newProduct.sku);
    formData.append("name", newProduct.name);
    formData.append("stock", newProduct.stock);
    formData.append("status", newProduct.status);
    formData.append("location", newProduct.location);
    if (newProduct.image) {
      formData.append("image", newProduct.image);
    }

    try {
      await axios.put(
        `http://localhost:5000/api/products/${newProduct.id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      fetchProducts();
      setShowModal(false);
      setEditMode(false);
      setNewProduct({ id: "", sku: "", name: "", stock: 0, status: "", location: "", image: null });
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Fungsi untuk menampilkan modal konfirmasi hapus
  const handleDeleteClick = (id) => {
    setProductToDelete(id);
    setShowConfirmDeleteModal(true);
  };

  // Fungsi untuk mengonfirmasi hapus produk
  const confirmDeleteProduct = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/products/${productToDelete}`
      );
      fetchProducts();
      setShowConfirmDeleteModal(false);
      setProductToDelete(null);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Fungsi untuk mengunduh data dalam format CSV
  const downloadExcel = () => {
    const csvData = [
      ["ID", "SKU", "Nama Produk", "Stok", "Status", "Lokasi Gudang"], // Tambahkan kolom Lokasi Gudang
      ...products.map((product) => [
        product.id,
        product.sku,
        product.name,
        product.stock,
        product.status,
        product.location, // Ambil Lokasi Gudang
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "data_produk.csv";
    link.click();
  };

  return (
    
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-6">
          <h1 className="text-2xl font-semibold text-green-700 border-b-2 border-green-700 cursor-pointer">
            Inventori
          </h1>
        </div>
        <div className="flex items-center space-x-4 text-gray-500">
          <button className="flex items-center text-green-700 space-x-1">
            <FaList className="mr-1" /> <span>Total Seluruh Asset</span>
          </button>
        </div>
      </div>
  
      {/* Search and Filter Section */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4 w-2/3">
          <div className="relative w-full">
            <FaSearch className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari produk..."
              className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-300"
              value={searchKeyword}
              onChange={handleSearchChange}
            />
          </div>
  
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-full text-gray-500 focus:outline-none"
          >
            <option value="">Semua Status</option>
            <option value="Tersedia">Tersedia</option>
            <option value="Habis">Habis</option>
          </select>
  
          <input
            type="number"
            placeholder="Stok Maksimum"
            className="px-4 py-2 border border-gray-300 rounded-full text-gray-500 focus:outline-none"
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
          />
        </div>
        <button
          onClick={downloadExcel}
          className="bg-green-700 text-white px-4 py-2 rounded-full flex items-center space-x-1 hover:bg-green-800"
        >
          <FaFileExcel className="mr-1" /> <span>Data Excel</span>
        </button>
      </div>
  
      {/* Product Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 bg-gray-100 border-b border-gray-300">
          <h1 className="text-lg font-semibold">Daftar Produk</h1>
          <div className="flex items-center space-x-4">
            <button className="flex items-center text-gray-500">
              <FaHistory className="mr-1" /> Histori Data
            </button>
            <button
              onClick={() => {
                setShowModal(true);
                setEditMode(false);
              }}
              className="bg-green-700 text-white px-4 py-2 rounded-full hover:bg-green-800 flex items-center"
            >
              <FaPlus /> <span>Produk</span>
            </button>
          </div>
        </div>
  
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-left">
                <th className="py-3 px-4 font-semibold text-left w-32">SKU</th>
                <th className="py-3 px-4 font-semibold text-left w-64">Nama</th>
                <th className="py-3 px-4 font-semibold text-left w-24">Stok</th>
                <th className="py-3 px-4 font-semibold text-left w-32">Status</th>
                <th className="py-3 px-4 font-semibold text-left w-32">
                  Lokasi Gudang
                </th>
                <th className="py-3 px-4 font-semibold text-left w-32">Aksi</th>
              </tr>
            </thead>
            <tbody>
  {getPaginatedData().map((product) => (
    <tr
      key={product.id}
      className="border-b border-gray-300 hover:bg-gray-50 cursor-pointer"
      onClick={() => handleViewDetails(product)} // Tambahkan ini
    >
      <td className="py-3 px-4">{product.sku}</td>
      <td className="py-3 px-4">{product.name}</td>
      <td className="py-3 px-4">{product.stock}</td>
      <td className="py-3 px-4">{product.status}</td>
      <td className="py-3 px-4">{product.location}</td>
      <td className="py-3 px-4 flex space-x-2">
        <button
          onClick={(e) => {
            e.stopPropagation(); // Hindari membuka modal detail
            handleEditProduct(product);
          }}
          className="text-blue-500 hover:text-blue-700"
        >
          <FaEdit />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation(); // Hindari membuka modal detail
            handleDeleteClick(product.id);
          }}
          className="text-red-500 hover:text-red-700"
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  ))}
</tbody>
          </table>
          {/* Pagination */}
<div className="flex justify-end mt-4 pr-4 mb-6">
  <nav>
    <ul className="flex items-center space-x-2">
      {/* First Page */}
      <li>
        <button
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded-full ${
            currentPage === 1
              ? "bg-gray-300"
              : "bg-gray-200 hover:bg-gray-400"
          }`}
        >
          «
        </button>
      </li>

      {/* Previous Page */}
      <li>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded-full ${
            currentPage === 1
              ? "bg-gray-300"
              : "bg-gray-200 hover:bg-gray-400"
          }`}
        >
          ‹
        </button>
      </li>

      {/* Page Numbers */}
      {Array.from({ length: getTotalPages() }, (_, index) => (
        <li key={index}>
          <button
            onClick={() => handlePageClick(index + 1)}
            className={`px-3 py-1 rounded-full ${
              currentPage === index + 1
                ? "bg-green-700 text-white"
                : "bg-gray-200 hover:bg-gray-400"
            }`}
          >
            {index + 1}
          </button>
        </li>
      ))}

      {/* Next Page */}
      <li>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === getTotalPages()}
          className={`px-3 py-1 rounded-full ${
            currentPage === getTotalPages()
              ? "bg-gray-300"
              : "bg-gray-200 hover:bg-gray-400"
          }`}
        >
          ›
        </button>
      </li>

      {/* Last Page */}
      <li>
        <button
          onClick={() => setCurrentPage(getTotalPages())}
          disabled={currentPage === getTotalPages()}
          className={`px-3 py-1 rounded-full ${
            currentPage === getTotalPages()
              ? "bg-gray-300"
              : "bg-gray-200 hover:bg-gray-400"
          }`}
        >
          »
        </button>
      </li>
    </ul>
  </nav>
</div>
</div>
</div>
{/* Detail modal */}
      {/* Modal Detail Produk */}
{showDetailModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
      <h2 className="text-lg font-bold mb-4 border-b pb-2">Detail Produk</h2>

      <div className="grid grid-cols-3 gap-4">
        {/* Kolom Kiri untuk Gambar */}
        <div className="col-span-1 flex items-center justify-center">
          {selectedProduct.image ? (
            <img
              src={selectedProduct.image} // Pastikan URL gambar valid
              alt="Product"
              className="h-40 w-40 object-cover rounded"
            />
          ) : (
            <div className="h-40 w-40 bg-gray-200 flex items-center justify-center rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-16 h-16 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              <span className="text-gray-500 text-sm">Tidak Ada Gambar</span>
            </div>
          )}
        </div>

        {/* Kolom Kanan untuk Detail */}
        <div className="col-span-2">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600 font-semibold">SKU:</span>
              <span className="text-gray-900">{selectedProduct.sku}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 font-semibold">Nama:</span>
              <span className="text-gray-900">{selectedProduct.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 font-semibold">Stock:</span>
              <span className="text-gray-900">{selectedProduct.stock}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 font-semibold">Satuan:</span>
              <span className="text-gray-900">{selectedProduct.unit || '-'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 font-semibold">Status:</span>
              <span className="text-gray-900">{selectedProduct.status}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 font-semibold">Lokasi Gudang:</span>
              <span className="text-gray-900">{selectedProduct.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 font-semibold">Lokasi Rak:</span>
              <span className="text-gray-900">
                {selectedProduct.shelfLocation || '-'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tombol Tutup */}
      <div className="flex justify-end mt-6">
        <button
          onClick={() => setShowDetailModal(false)}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400"
        >
          Tutup
        </button>
      </div>
    </div>
  </div>
)}


      {/* Modal untuk tambah/edit produk */}
{/* Modal untuk tambah/edit produk */}
{showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl max-h-screen overflow-y-auto">
      <h2 className="text-xl font-semibold mb-8 border-b pb-3">
        {editMode ? "Edit Produk" : "Tambah Produk Baru"}
      </h2>

      <div className="grid grid-cols-2 gap-6">
        {/* Card Kiri */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          {/* Input Foto Produk */}
          <div className="flex flex-col items-start mb-6">
            <label className="text-gray-700 font-medium mb-2">Foto Produk</label>
            <div className="flex items-center space-x-4">
              <label
                htmlFor="fileInput"
                className="bg-gray-100 p-4 border border-dashed border-gray-300 rounded-lg cursor-pointer flex items-center justify-center"
                style={{ width: "120px", height: "120px" }}
              >
                {newProduct.image ? (
                  <img
                    src={URL.createObjectURL(newProduct.image)}
                    alt="Preview"
                    className="h-full w-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="text-gray-400 text-sm flex flex-col items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-10 h-10"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                    <span>Upload</span>
                  </div>
                )}
              </label>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image: e.target.files[0] })
                }
              />
            </div>
          </div>

          {/* Input SKU Produk */}
          <div className="flex flex-col items-start mb-4">
            <label className="text-gray-700 font-medium mb-2">SKU Produk *</label>
            <input
              type="text"
              placeholder="Masukkan SKU produk"
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-300"
              value={newProduct.sku}
              onChange={(e) =>
                setNewProduct({ ...newProduct, sku: e.target.value })
              }
            />
          </div>

          {/* Input Nama Produk */}
          <div className="flex flex-col items-start mb-4">
            <label className="text-gray-700 font-medium mb-2">Nama Produk *</label>
            <input
              type="text"
              placeholder="Masukkan nama produk"
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-300"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
          </div>

          {/* Input Jumlah Stok dan Satuan */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col items-start">
              <label className="text-gray-700 font-medium mb-2">
                Jumlah Stok *
              </label>
              <input
                type="number"
                placeholder="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-300"
                value={newProduct.stock}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    stock: Number(e.target.value),
                  })
                }
              />
            </div>
            <div className="flex flex-col items-start">
              <label className="text-gray-700 font-medium mb-2">Satuan *</label>
              <input
                type="text"
                placeholder="pcs"
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-300"
                value={newProduct.unit || ""}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, unit: e.target.value })
                }
              />
            </div>
          </div>

          {/* Input Status Produk */}
          <div className="flex flex-col items-start mb-4">
            <label className="text-gray-700 font-medium mb-2">
              Status Produk *
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-300"
              value={newProduct.status}
              onChange={(e) =>
                setNewProduct({ ...newProduct, status: e.target.value })
              }
            >
              <option value="">Pilih Status</option>
              <option value="Tersedia">Tersedia</option>
              <option value="Habis">Habis</option>
            </select>
          </div>

          {/* Input Lokasi Gudang */}
          <div className="flex flex-col items-start">
            <label className="text-gray-700 font-medium mb-2">
              Lokasi Gudang *
            </label>
            <select
        value={selectedWarehouse}
        onChange={(e) => setSelectedWarehouse(e.target.value)}
        className="form-control"
    >
        <option value="">Pilih Gudang</option>
        {warehouses.map((warehouse) => (
            <option key={warehouse.id} value={warehouse.id}>
                {warehouse.name}
            </option>
        ))}
    </select>

          </div>
        </div>

        {/* Card Kanan */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col">
          {/* Input Lokasi Rak */}
          <div className="flex flex-col items-start mb-4">
            <label className="text-gray-700 font-medium mb-2">Lokasi Rak</label>
            <input
              type="text"
              placeholder="Masukkan lokasi rak"
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-300"
              value={newProduct.shelfLocation || ""}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  shelfLocation: e.target.value,
                })
              }
            />
          </div>

          {/* Tombol Aksi */}
          <div className="flex justify-end space-x-4 mt-4">
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400"
            >
              Batal
            </button>
            <button
              onClick={editMode ? handleUpdateProduct : handleAddProduct}
              className="px-4 py-2 bg-green-700 text-white rounded-full hover:bg-green-800"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
      )}
    </div>
  );
  
};

export default Produk;
