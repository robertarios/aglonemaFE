import React, { useState, useEffect } from "react";
import axios from "axios";

// Function to format date to "yyyy-MM-dd"
const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const ReminderModal = ({ isOpen, onClose, onSave, reminderData }) => {
  const [name, setName] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [updatedBy, setUpdatedBy] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError("Gagal memuat produk");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (reminderData) {
      setName(reminderData.name);
      setExpirationDate(formatDate(reminderData.expirationDate)); // Use formatDate here
      setUpdatedBy(reminderData.updatedBy);
      setSelectedProduct(reminderData.selectedProduct);
    } else {
      setName("");
      setExpirationDate("");
      setUpdatedBy("");
      setSelectedProduct("");
    }
  }, [reminderData]);

  const handleSave = async () => {
    const newReminder = {
      name,
      expirationDate,
      updatedBy,
      selectedProduct,
    };

    try {
      if (reminderData?.id) {
        const response = await axios.put(
          `http://localhost:5000/api/reminders/${reminderData.id}`,
          newReminder
        );
      } else {
        const response = await axios.post(
          "http://localhost:5000/api/reminders",
          newReminder
        );
      }

      // Ensure onSave is passed as a function
      if (typeof onSave === "function") {
        onSave(); // Call the onSave function to refresh the data
      }

      onClose();
    } catch (error) {
      console.error("Error saving or updating reminder:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">
          {reminderData ? "Edit Reminder" : "Tambah Pengingat"}
        </h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Nama Pengingat</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Nama Pengingat"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Tanggal Kedaluarsa</label>
            <input
              type="date"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Diupdate Oleh</label>
            <input
              type="text"
              value={updatedBy}
              onChange={(e) => setUpdatedBy(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Diupdate Oleh"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Produk Terpilih</label>
            {loading ? (
              <div className="text-gray-500">Loading products...</div>
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : (
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Pilih Produk</option>
                {products.map((product) => (
                  <option key={product.id} value={product.name}>
                    {product.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 bg-[#467469] text-white rounded-md"
            >
              {reminderData ? "Simpan Perubahan" : "Tambah Pengingat"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReminderModal;
