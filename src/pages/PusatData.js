import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios for API requests
import Newsidebar from "../components/NewSidebar";
import Navbar from "../components/Navbar";
import { FaSearch, FaCog, FaPlus, FaRegSadTear } from "react-icons/fa";
import DataEditModal from "../components/DataEditModal";
import AddUserModal from "../components/AddUserModal";

const PusatData = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedData, setSelectedData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [users, setUsers] = useState([]); // State to store user data

  // Fetch user data from the backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/pusatdata")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Filter users based on search
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredUsers.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle opening the modal to edit data
  const handleEditClick = (user) => {
    setSelectedData(user);
    setIsModalOpen(true);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedData(null);
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  
  const handleUserUpdated = (updatedUser) => {
    if (updatedUser) {
      // Update the user data in the state
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        )
      );
    }
  };

  // Handle saving the edited user data
  const handleSave = (updatedData) => {
    axios
      .put(`http://localhost:5000/api/pusatdata/${updatedData.id}`, updatedData)
      .then((response) => {
        // Memperbarui state users setelah data berhasil diperbarui
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === updatedData.id ? response.data : user
          )
        );
        handleCloseModal(); // Menutup modal setelah update
      })
      .catch((error) => {
        console.error("Error updating data:", error);
        alert("There was an error updating the data.");
      });
  };
  

  // Handle deleting the user data
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/pusatdata/${id}`)
      .then(() => {
        // Update state users setelah penghapusan
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        handleCloseModal(); // Menutup modal
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
        alert("There was an error deleting the data.");
      });
  };
  

  const addUser = async (newUser) => {
    try {
      const response = await fetch("http://localhost:5000/api/pusatdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
  
      if (response.ok) {
        const result = await response.json();
        // Menambahkan pengguna baru ke dalam state users
        setUsers((prevUsers) => [...prevUsers, result]);
      } else {
        console.error("Failed to add user");
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };
  

  return (
    <div className="flex bg-[#FAFAFA]">
      <Newsidebar />
      <div className="flex-1 flex flex-col bg-[#FAFAFA]">
        <Navbar />
        <div className="p-6 h-screen">
          <h2 className="text-lg font-bold text-[#272d3b] mb-4 text-left relative">
            Daftar Pengguna
          </h2>
          <hr className="border-t border-[#e0e0e0] mb-4" />
          <div className="flex justify-between items-center mb-4">
            <div className="relative w-1/4">
              <span className="absolute inset-y-0 h-full left-0 flex items-center pl-3 mt-1 text-gray-500">
                <FaSearch />
              </span>
              <input
                type="text"
                placeholder="Cari Pengguna..."
                className="w-full pl-10 p-2 mt-3 border border-gray-500 rounded-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th
                    colSpan="5"
                    className="text-left py-4 px-6 text-black font-semibold"
                  >
                    Pusat Data Pengguna
                  </th>
                  <th className="py-4 px-6 text-gray-500">
                    <div className="flex justify-end">
                      <button className="bg-[#467469] text-white p-3 rounded-full flex items-center"
                        onClick={openModal}
                      >
                        <FaPlus className="mr-2" /> Tambah Pengguna
                      </button>
                    </div>
                  </th>
                </tr>
              </thead>

              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-6 text-gray-500 font-semibold">
                    ID
                  </th>
                  <th className="text-left py-4 px-6 text-gray-500 font-semibold">
                    Nama
                  </th>
                  <th className="text-left py-4 px-6 text-gray-500 font-semibold">
                    Email
                  </th>
                  <th className="text-left py-4 px-6 text-gray-500 font-semibold">
                    Hak Akses
                  </th>
                  <th className="text-left py-4 px-6 text-gray-500 font-semibold">
                    Pusat Data
                  </th>
                  <th className="py-4 px-6 text-gray-500">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {currentUsers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-4 text-center px-6">
                      <div className="flex flex-col items-center justify-center">
                        <FaRegSadTear className="text-gray-400 text-4xl mb-4" />
                        <span className="text-gray-500">
                          Tambah data pengguna anda
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  currentUsers.map((user) => (
                    <tr key={user.id} className="border-b">
                      <td className="py-4 text-left px-6">{user.id}</td>
                      <td className="py-4 text-left px-6">{user.name}</td>
                      <td className="py-4 text-left px-6">{user.email}</td>
                      <td className="py-4 text-left px-6">
                        {user.access_level}
                      </td>
                      <td className="py-4 text-left px-6">
                        {user.data_center}
                      </td>
                      <td className="py-4 text-center pr-8 px-6">
                        <button
                          onClick={() => handleEditClick(user)}
                          className="bg-gray-300 text-black p-2 rounded ml-3"
                        >
                          <FaCog />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      <DataEditModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        onDelete={handleDelete}
        data={selectedData}
        onUserUpdated={handleUserUpdated}
      />

      <AddUserModal
        isOpen={modalOpen}
        closeModal={closeModal}
        addUser={addUser}
      />
    </div>
  );
};

export default PusatData;
