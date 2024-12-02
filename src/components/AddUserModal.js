import React, { useState, useEffect } from "react";
import axios from "axios";

const AddUserModal = ({ isOpen, closeModal, addUser }) => {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    access_level: "",
    data_center: "",
  });
  const [warehouses, setWarehouses] = useState([]); // State untuk data gudang

  // Fetch data gudang dari API
  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/gudang"); // Ganti dengan endpoint API gudang kamu
        setWarehouses(response.data);
      } catch (error) {
        console.error("Gagal mengambil data gudang:", error);
      }
    };

    fetchWarehouses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !newUser.name ||
      !newUser.email ||
      !newUser.access_level ||
      !newUser.data_center
    ) {
      alert("Semua field harus diisi!");
      return;
    }

    await addUser(newUser);
    setNewUser({
      name: "",
      email: "",
      access_level: "",
      data_center: "",
    });
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg w-1/3">
        <h2 className="text-2xl font-semibold mb-4">Tambah Pengguna</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold mb-2">
              Nama
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={newUser.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded"
              placeholder="Masukkan nama pengguna"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded"
              placeholder="Masukkan email pengguna"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="accessLevel"
              className="block text-sm font-semibold mb-2"
            >
              Hak Akses
            </label>
            <select
              id="access_level"
              name="access_level"
              value={newUser.access_level}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded"
              required
            >
              <option value="" disabled>
                Pilih hak akses
              </option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="data_center"
              className="block text-sm font-semibold mb-2"
            >
              Nama Gudang
            </label>
            <select
              id="data_center"
              name="data_center"
              value={newUser.data_center}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded"
              required
            >
              <option value="" disabled>
                Pilih nama gudang
              </option>
              {warehouses.map((warehouse) => (
                <option key={warehouse.id} value={warehouse.name}>
                  {warehouse.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
            >
              Tambah
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
