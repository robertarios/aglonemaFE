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
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [newProduct, setNewProduct] = useState({
    id: "",
    sku: "",
    name: "",
    stock: 0,
    status: "",
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
    try {
      await axios.post("http://localhost:5000/api/products", newProduct);
      fetchProducts();
      setShowModal(false);
      setNewProduct({ id: "", sku: "", name: "", stock: 0, status: "" });
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
    try {
      await axios.put(
        `http://localhost:5000/api/products/${newProduct.id}`,
        newProduct
      );
      fetchProducts();
      setShowModal(false);
      setEditMode(false);
      setNewProduct({ id: "", sku: "", name: "", stock: 0, status: "" });
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
      await axios.delete(`http://localhost:5000/api/products/${productToDelete}`);
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
      ["ID", "SKU", "Nama Produk", "Stok", "Status"],
      ...products.map((product) => [
        product.id,
        product.sku,
        product.name,
        product.stock,
        product.status,
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
          <h2 className="text-2xl font-semibold text-gray-400 cursor-pointer">
            Kategori
          </h2>
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
          {/* Input Pencarian */}
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

          {/* Filter Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-full text-gray-500 focus:outline-none"
          >
            <option value="">Semua Status</option>
            <option value="Tersedia">Tersedia</option>
            <option value="Habis">Habis</option>
          </select>

          {/* Filter Stok */}
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
                <th className="py-3 px-4 font-semibold text-left w-16">
                  <input type="checkbox" />
                </th>
                <th className="py-3 px-4 font-semibold text-left w-32">SKU</th>
                <th className="py-3 px-4 font-semibold text-left w-64">Nama</th>
                <th className="py-3 px-4 font-semibold text-left w-24">Stok</th>
                <th className="py-3 px-4 font-semibold text-left w-32">
                  Status
                </th>
                <th className="py-3 px-4 font-semibold text-left w-32">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-gray-300 hover:bg-gray-50"
                >
                  <td className="py-3 px-4">
                    <input type="checkbox" />
                  </td>
                  <td className="py-3 px-4">{product.sku}</td>
                  <td className="py-3 px-4">{product.name}</td>
                  <td className="py-3 px-4">{product.stock}</td>
                  <td className="py-3 px-4">{product.status}</td>
                  <td className="py-3 px-4 flex space-x-2">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(product.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal untuk tambah/edit produk */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">
              {editMode ? "Edit Produk" : "Tambah Produk"}
            </h2>
            <input
              type="text"
              placeholder="SKU Produk"
              className="w-full mb-2 p-2 border"
              value={newProduct.sku}
              onChange={(e) =>
                setNewProduct({ ...newProduct, sku: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Nama Produk"
              className="w-full mb-2 p-2 border"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Stok Produk"
              className="w-full mb-2 p-2 border"
              value={newProduct.stock}
              onChange={(e) =>
                setNewProduct({ ...newProduct, stock: Number(e.target.value) })
              }
            />
            <select
              className="w-full mb-4 p-2 border"
              value={newProduct.status}
              onChange={(e) =>
                setNewProduct({ ...newProduct, status: e.target.value })
              }
            >
              <option value="">Pilih Status</option>
              <option value="Tersedia">Tersedia</option>
              <option value="Habis">Habis</option>
            </select>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Batal
              </button>
              <button
                onClick={editMode ? handleUpdateProduct : handleAddProduct}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal konfirmasi hapus */}
      {showConfirmDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Konfirmasi Hapus</h2>
            <p>Apakah Anda yakin ingin menghapus produk ini?</p>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setShowConfirmDeleteModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Batal
              </button>
              <button
                onClick={confirmDeleteProduct}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Produk;
