import { useState } from "react";
import Newsidebar from "../components/NewSidebar"; // Mengimpor Sidebar yang baru
import Navbar from "../components/Navbar";
import Iconverify from "../assets/verifycard.png";
import VerificationCard from "../components/VerificationCard";
import SidebarMenu from "../components/SidebarMenu";

function UbahSandi() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [logo, setLogo] = useState(null);

  // Handlers for input changes
  const handleNameChange = (event) => setName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handleAddressChange = (event) => setAddress(event.target.value);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Profile updated:", {
      name,
      email,
      address,
      logo,
    });
  };
  const [imagePreview, setImagePreview] = useState(null);

  // Fungsi untuk menangani perubahan gambar
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Membaca file dan menampilkan preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Update state dengan URL gambar
      };
      reader.readAsDataURL(file); // Membaca gambar sebagai Data URL
    }
  };

  return (
    <div className="flex h-[920px] bg-gray-100">
      {/* Sidebar */}
      <Newsidebar />
      {/* Main Content */}
      <div className="flex-1">
        <Navbar />
        <div className="flex">
          {/* Left Side: Menu Edit Profile */}
          <div className="w-1/4 py-10 mr-6">
            <SidebarMenu />
            <VerificationCard />
          </div>

          {/* Right Side: Form and Cards */}
          <div className="flex-1 mr-8">
            {/* Cards Section */}
            <div className="flex flex-col">
              {/* Card 2*/}
              <div className="w-full p-5 mt-10 bg-white rounded-lg shadow-md flex flex-col mr-8">
                {/* Header */}
                <h2 className="text-lg font-bold text-[#272d3b] mb-4 text-left">
                  Ubah Kata Sandi
                </h2>
                <hr className="border-t border-[#e0e0e0] mb-4" />

                {/* Sandi Lama */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 mt-4">
                    <label className="block text-sm text-[#3c4b64] mb-1 text-left">
                      Kata Sandi Lama
                    </label>
                    <input
                      type="password"
                      placeholder="************"
                      className="w-full h-[40px] px-4 border rounded-full text-[#5c6873]"
                    />
                  </div>

                  {/* Kata Sandi Baru */}
                  <div className="col-span-2 mt-2">
                    <label className="block text-sm text-[#3c4b64] mb-1 text-left">
                      Kata Sandi Baru
                    </label>
                    <input
                      type="password"
                      placeholder="************"
                      className="w-full h-[40px] px-4 mb-4 border rounded-full text-[#5c6873]"
                    />
                  </div>

                  {/* Konfirmasi Kata Sandi */}
                  <div className="col-span-2 mb-8">
                    <label className="block text-sm text-[#3c4b64] mb-1 text-left">
                      Konfirmasi Kata Sandi
                    </label>
                    <input
                      type="password"
                      placeholder="************"
                      className="w-full h-[40px] px-4 mb-4 border rounded-full text-[#5c6873]"
                    />
                  </div>
                </div>
              </div>

              {/* Save Button */}
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
