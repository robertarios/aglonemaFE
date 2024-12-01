import React, { useState } from "react";
import axios from 'axios';

const AddWarehouse = ({ onClose, onSave }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    address: "",
    detail: "",  // Plus Code
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct the warehouse object
    const newWarehouse = {
      id: Date.now().toString(),
      ...formData,
    };

    try {
      // Sending the POST request to save data in the backend
      const response = await axios.post('http://localhost:5000/api/gudang', newWarehouse, {
        headers: { 
          "Authorization": `Bearer ${token}`
      },
    });

      if (response.status === 201) {
        console.log("Warehouse added successfully");
        onSave(newWarehouse);  // Optionally, update the parent state
        onClose();  // Close the form
      }
    } catch (error) {
      console.error("Error adding warehouse:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl font-semibold mb-4">Tambah Gudang Baru</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="id"
            placeholder="ID Gudang"
            className="border p-2 mb-4 w-full"
            value={formData.id}
            onChange={handleChange}
          />
          <input
            type="text"
            name="name"
            placeholder="Nama Gudang"
            className="border p-2 mb-4 w-full"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Alamat"
            className="border p-2 mb-4 w-full"
            value={formData.address}
            onChange={handleChange}
          />
          <input
            type="text"
            name="detail"
            placeholder="Plus Code Lokasi (misalnya: 4P8W+6MW)"
            className="border p-2 mb-4 w-full"
            value={formData.detail}
            onChange={handleChange}
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWarehouse;
