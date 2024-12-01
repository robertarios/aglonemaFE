import React, { useState, useEffect } from "react";
import axios from "axios";

const WarehouseForm = ({ warehouse, onClose, onSave, onDelete }) => {
  const [formData, setFormData] = useState({ ...warehouse });

  useEffect(() => {
    setFormData({ ...warehouse });
  }, [warehouse]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      console.log("Saving data:", formData); // Log form data to check before sending
      const response = await axios.put(
        `http://localhost:5000/api/gudang/${formData.id}`,
        formData
      );
      console.log("Response:", response); // Log response to check if the request is successful

      if (response.status === 200 || response.status === 204) {
        console.log("Warehouse updated successfully");
        onSave(formData); // Update parent state with new data
        onClose(); // Close the form
      }
    } catch (error) {
      console.error("Error saving warehouse:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/gudang/${warehouse.id}`);
      onDelete(warehouse.id); // Update parent state to remove the warehouse
      onClose(); // Close the form
    } catch (error) {
      console.error("Error deleting warehouse:", error);
    }
  };

  return (
    <div className="modal bg-white p-6 rounded shadow-lg">
      <form onSubmit={handleSave}>
        <div className="mb-4">
          <label className="block text-gray-700">Warehouse Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Warehouse Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Warehouse Details</label>
          <input
            type="text"
            name="detail"
            value={formData.detail}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
          >
            Close
          </button>
          <div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default WarehouseForm;
