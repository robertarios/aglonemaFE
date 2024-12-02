import React, { useState, useEffect } from "react";
import axios from "axios";

const DataEditModal = ({ isOpen, onClose, data, onUserUpdated }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    accessLevel: "user", // Default "user" before data is fetched
    dataCenter: "",
  });
  const [dataCenters, setDataCenters] = useState([]); // State for data centers
  const [warehouses, setWarehouses] = useState([]); // State for Gudang (Data Centers)
  const [error, setError] = useState(""); // Error state for validation

  // Fetch data centers (from pusatdata API)
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/pusatdata")
      .then((response) => {
        setDataCenters(response.data.dataCenters);
      })
      .catch((error) => {
        console.error("Error fetching data centers:", error);
      });
  }, []);

  // Fetch Gudang options (from Gudang API)
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

  // Set form data when 'data' prop changes
  useEffect(() => {
    if (data) {
      setFormData({
        id: data.id,
        name: data.name,
        email: data.email,
        accessLevel: data.access_level || "user", // Default to "user" if access_level is not available
        dataCenter: data.data_center,
      });
    }
  }, [data]); // Run when 'data' prop changes

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission (Save)
  const handleSave = async (e) => {
    e.preventDefault();

    // Manual validation for access level
    if (formData.accessLevel !== "admin" && formData.accessLevel !== "user") {
      setError("Access level must be either 'admin' or 'user'.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/pusatdata/${formData.id}`,
        formData
      );
      if (response.status === 200) {
        onUserUpdated(response.data); // Update the user in parent component
        onClose(); // Close the modal
      }
    } catch (error) {
      console.error("Error updating data:", error);
      alert("There was an error updating the data.");
    }
  };

  // Handle Delete
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/pusatdata/${formData.id}`
      );
      if (response.status === 200) {
        alert("User deleted successfully.");
        onUserUpdated(null); // Remove the user from parent state
        onClose(); // Close the modal
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      alert("There was an error deleting the data.");
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h3 className="text-xl font-semibold mb-4">Edit User Data</h3>
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Access Level</label>
            <select
              name="accessLevel"
              value={formData.accessLevel}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Data Center</label>
            <select
              name="dataCenter"
              value={formData.dataCenter}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select Data Center</option>
              {warehouses.map((warehouse) => (
                <option key={warehouse.id} value={warehouse.name}>
                  {warehouse.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-black py-2 px-6 rounded-full"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-6 rounded-full"
            >
              Save
            </button>
            <button
              type="submit"
              onClick={handleDelete}
              className="bg-red-500 text-white py-2 px-6 rounded-full"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default DataEditModal;
