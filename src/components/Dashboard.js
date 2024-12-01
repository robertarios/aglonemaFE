import React, { useState, useEffect } from "react";
import { FaUpload, FaExclamationTriangle, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [products, setProducts] = useState([]); 
  const [totalStock, setTotalStock] = useState(0);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [role, setRole] = useState(localStorage.getItem('role') || '');

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect((role) => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const total = products.reduce((sum, product) => sum + product.stock, 0);
    setTotalStock(total);
  }, [products]);

  if (role == "admin"){
    return (
      <div className="p-6 bg-gray-100 min-h-screen space-y-4">
        {/* Header Section */}
        <div className="bg-green-800 text-white p-6 rounded-lg shadow-md">
          <h1 className="text-xl font-semibold">Terima Kasih</h1>
          <p className="mt-1 text-sm">Telah Bergabung dengan Tim AgloStock</p>
          <div className="flex items-center justify-between mt-4">
            <div className="text-base font-light">
              Pencatatan inventori lebih efisien dan efektif dimulai dari AgloStock
            </div>
            
            <div className="flex items-center space-x-2 bg-white text-green-800 p-2 rounded-md shadow-sm cursor-pointer">
              <FaUpload className="text-lg" />
              <Link to="/produk" className="text-sm font-medium underline">
                Buat Produk Pertamamu
              </Link>
            </div>
          </div>
        </div>
  
        {/* Notification Bar */}
        <div className="bg-green-200 p-3 rounded-lg shadow-md flex items-center">
          <FaExclamationTriangle className="text-green-800 mr-2" />
          <p className="text-sm text-green-800 flex-1">
            Manfaatkan fitur lebih maksimal dengan verifikasi nomor handphonemu sekarang!
            <a href="#" className="text-yellow-600 font-semibold ml-1">Verifikasi Sekarang</a>
          </p>
        </div>
  
        {/* Main Dashboard Content */}
        <div className="space-y-6">
          {/* Performa Stock Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Performa Stock</h2>
              <div className="flex items-center text-sm text-gray-500">
                <FaCalendarAlt className="mr-2" />
                <span>Jumat, 11 Okt - Jumat, 25 Okt 20...</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-800">
              Total Barang Masuk: <span className="text-4xl">{totalStock}</span>
            </div>
          </div>
  
          {/* Popular Product and Non-Productive Stock Section - Two Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Popular Product */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">Produk Populer</h2>
              <table className="w-full text-left text-gray-500">
                <thead>
                  <tr>
                    <th className="py-2">Nama Barang</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-8 text-center">
                      {/* <FaChartBar className="text-5xl text-blue-500 mb-2" /> */}
                      <p className="text-gray-500 text-sm">Belum ada data</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
  
            {/* Non-Productive Stock */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">Stok Tidak Produktif</h2>
              <table className="w-full text-left text-gray-500">
                <thead>
                  <tr>
                    <th className="py-2">Nama Barang</th>
                    <th className="py-2">Lama Stok</th>
                    <th className="py-2">Indeks</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-8 text-center" colSpan="3">
                      {/* <FaBoxOpen className="text-5xl text-blue-500 mb-2" /> */}
                      <p className="text-gray-500 text-sm">Belum ada data</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
  
          </div>
        </div>
      </div>
    );
  }

  if (role == "user"){
    return (
      <div className="p-6 bg-gray-100 min-h-screen space-y-4">
        {/* Header Section */}
        <div className="bg-green-800 text-white p-6 rounded-lg shadow-md">
          <h1 className="text-xl font-semibold">Terima Kasih</h1>
          <p className="mt-1 text-sm">Telah Bergabung dengan Tim AgloStock</p>
          <div className="flex items-center justify-between mt-4">
            <div className="text-base font-light">
              Pencatatan inventori lebih efisien dan efektif dimulai dari AgloStock
            </div>
            
          </div>
        </div>
  
        {/* Notification Bar */}
        <div className="bg-green-200 p-3 rounded-lg shadow-md flex items-center">
          <FaExclamationTriangle className="text-green-800 mr-2" />
          <p className="text-sm text-green-800 flex-1">
            Manfaatkan fitur lebih maksimal dengan verifikasi nomor handphonemu sekarang!
            <a href="#" className="text-yellow-600 font-semibold ml-1">Verifikasi Sekarang</a>
          </p>
        </div>
  
        {/* Main Dashboard Content */}
        <div className="space-y-6">
          {/* Performa Stock Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Performa Stock</h2>
              <div className="flex items-center text-sm text-gray-500">
                <FaCalendarAlt className="mr-2" />
                <span>Jumat, 11 Okt - Jumat, 25 Okt 20...</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-800">
              Total Barang Masuk: <span className="text-4xl">{totalStock}</span>
            </div>
          </div>
  
          {/* Popular Product and Non-Productive Stock Section - Two Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Popular Product */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">Produk Populer</h2>
              <table className="w-full text-left text-gray-500">
                <thead>
                  <tr>
                    <th className="py-2">Nama Barang</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-8 text-center">
                      {/* <FaChartBar className="text-5xl text-blue-500 mb-2" /> */}
                      <p className="text-gray-500 text-sm">Belum ada data</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
  
            {/* Non-Productive Stock */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">Stok Tidak Produktif</h2>
              <table className="w-full text-left text-gray-500">
                <thead>
                  <tr>
                    <th className="py-2">Nama Barang</th>
                    <th className="py-2">Lama Stok</th>
                    <th className="py-2">Indeks</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-8 text-center" colSpan="3">
                      {/* <FaBoxOpen className="text-5xl text-blue-500 mb-2" /> */}
                      <p className="text-gray-500 text-sm">Belum ada data</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
  
          </div>
        </div>
      </div>
    );
  }

  
};

export default Dashboard;
