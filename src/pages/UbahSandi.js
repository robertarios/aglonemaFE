import { useState } from "react";
import axios from "axios";
import Newsidebar from "../components/NewSidebar";
import Navbar from "../components/Navbar";
import SidebarMenu from "../components/SidebarMenu";

function UbahSandi() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Ambil userId dari localStorage
  const userId = localStorage.getItem("userId");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate inputs
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }

    try {
      // Send the password change request to the backend
      const response = await axios.put(
        `http://localhost:5000/api/users/changePassword/${userId}`,
        { oldPassword, newPassword, confirmPassword }
      );

      setSuccessMessage(response.data.message);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error updating password:", error);
      setError(error.response.data.error || "Failed to update password.");
      setSuccessMessage(""); // Clear success message
    }
  };

  return (
    <div className="flex h-[920px] bg-gray-100">
      <Newsidebar />
      <div className="flex-1">
        <Navbar />
        <div className="flex">
          <div className="w-1/4 py-10 mr-6">
            <SidebarMenu />
          </div>
          <div className="flex-1 mr-8">
            <div className="flex flex-col">
              <div className="w-full p-5 mt-10 bg-white rounded-lg shadow-md flex flex-col mr-8">
                <h2 className="text-lg font-bold text-[#272d3b] mb-4 text-left">
                  Ubah Kata Sandi
                </h2>
                <hr className="border-t border-[#e0e0e0] mb-4" />
                
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 mt-4">
                    <label className="block text-sm text-[#3c4b64] mb-1 text-left">
                      Kata Sandi Lama
                    </label>
                    <input
                      type="password"
                      placeholder="************"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="w-full h-[40px] px-4 border rounded-full text-[#5c6873]"
                    />
                  </div>

                  <div className="col-span-2 mt-2">
                    <label className="block text-sm text-[#3c4b64] mb-1 text-left">
                      Kata Sandi Baru
                    </label>
                    <input
                      type="password"
                      placeholder="************"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full h-[40px] px-4 mb-4 border rounded-full text-[#5c6873]"
                    />
                  </div>

                  <div className="col-span-2 mb-8">
                    <label className="block text-sm text-[#3c4b64] mb-1 text-left">
                      Konfirmasi Kata Sandi
                    </label>
                    <input
                      type="password"
                      placeholder="************"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full h-[40px] px-4 mb-4 border rounded-full text-[#5c6873]"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={handleSubmit}
                  className="bg-[#16423C] text-white py-3 px-6 rounded-full hover:bg-green-800"
                >
                  Simpan Perubahan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UbahSandi;
