import React, { useState, useEffect } from "react";
import axios from "axios";

const DataEditModal = ({ isOpen, onClose, data, onUserUpdated }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    accessLevel: "",
    dataCenter: "",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        id: data.id,
        name: data.name,
        email: data.email,
        accessLevel: data.access_level,
        dataCenter: data.data_center,
      });
    }
  }, [data]);

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

    try {
      const response = await axios.put(`http://localhost:5000/api/pusatdata/${formData.id}`, formData);
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
      const response = await axios.delete(`http://localhost:5000/api/pusatdata/${formData.id}`);
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
            <input
              type="text"
              name="accessLevel"
              value={formData.accessLevel}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Data Center</label>
            <input
              type="text"
              name="dataCenter"
              value={formData.dataCenter}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
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
              type="button"
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
