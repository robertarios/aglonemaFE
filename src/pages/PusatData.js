import React, { useState, useEffect } from "react";
import axios from "axios";
import Newsidebar from "../components/NewSidebar";
import Navbar from "../components/Navbar";
import { FaSearch, FaCog, FaPlus } from "react-icons/fa";
import DataEditModal from "../components/DataEditModal";
import AddUserModal from "../components/AddUserModal";

const PusatData = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedData, setSelectedData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/pusatdata")
      .then((response) => {
        console.log(response.data);
        setUsers(response.data.data);
        setTotalRecords(response.data.totalRecords);
      })
      .catch((error) => console.error("Error fetching data:", error));
      
  }, []);

  const filteredUsers = Array.isArray(users)
    ? users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(totalRecords / itemsPerPage);

  // Array nomor halaman
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  // Fungsi navigasi halaman
  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleEditClick = (user) => {
    setSelectedData(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedData(null);
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleSave = (updatedData) => {
    axios
      .put(`http://localhost:5000/api/pusatdata/${updatedData.id}`, updatedData)
      .then((response) => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === updatedData.id ? response.data : user
          )
        );
        handleCloseModal();
        // Refetch data setelah update
        refetchData();
      })
      .catch((error) => {
        console.error("Error updating data:", error);
        alert("There was an error updating the data.");
      });
  };
  
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/pusatdata/${id}`)
      .then(() => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        handleCloseModal();
        // Refetch data setelah delete
        refetchData();
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
        alert("There was an error deleting the data.");
      });
  };
  
  // Fungsi refetch data
  const refetchData = () => {
    axios
      .get("http://localhost:5000/api/pusatdata")
      .then((response) => {
        setUsers(response.data.data);
        setTotalRecords(response.data.totalRecords);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };
  
  const addUser = async (newUser) => {
    try {
      const response = await axios.post("http://localhost:5000/api/pusatdata", newUser);
      
      if (response.status === 201) { // Pastikan data berhasil ditambahkan
        const addedUser = response.data;
        console.log(response.data);
        setUsers((prevUsers) => [...prevUsers, addedUser]); // Tambahkan ke state
        closeModal(); // Tutup modal setelah berhasil
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
                      <button
                        className="bg-[#467469] text-white p-3 rounded-full flex items-center"
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
                    Gudang
                  </th>
                  <th className="py-4 px-6 text-gray-500">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {currentUsers.map((user) => (
                  <tr key={user.id} className="border-b">
                    <td className="py-4 text-left px-6">{user.id}</td>
                    <td className="py-4 text-left px-6">{user.name}</td>
                    <td className="py-4 text-left px-6">{user.email}</td>
                    <td className="py-4 text-left px-6">{user.access_level}</td>
                    <td className="py-4 text-left px-6">{user.data_center}</td>
                    <td className="py-4 text-center pr-8 px-6">
                      <button
                        onClick={() => handleEditClick(user)}
                        className="bg-gray-300 text-black p-2 rounded ml-3"
                      >
                        <FaCog />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-end mt-4">
              <ul className="flex space-x-2 items-center">
                <li>
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    className="px-4 py-2 border rounded bg-white text-[#467469]"
                    disabled={currentPage === 1}
                  >
                    «
                  </button>
                </li>
                {pageNumbers.map((number) => (
                  <li key={number}>
                    <button
                      onClick={() => paginate(number)}
                      className={`px-4 py-2 border rounded ${
                        number === currentPage
                          ? "bg-[#467469] text-white"
                          : "bg-white text-[#467469]"
                      }`}
                    >
                      {number}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    className="px-4 py-2 border rounded bg-white text-[#467469]"
                    disabled={currentPage === pageNumbers.length}
                  >
                    »
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>


        <DataEditModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={handleSave}
          onDelete={handleDelete}
          data={selectedData}
          onUserUpdated={handleSave}
        />

        <AddUserModal
          isOpen={modalOpen}
          closeModal={closeModal}
          addUser={addUser}
        />
      </div>
    </div>
  );
};

export default PusatData;
