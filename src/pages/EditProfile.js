import { useState } from "react";
import Newsidebar from "../components/NewSidebar"; // Mengimpor Sidebar yang baru
import Navbar from "../components/Navbar";
import Iconverify from "../assets/verifycard.png";
import VerificationCard from "../components/VerificationCard";
import SidebarMenu from "../components/SidebarMenu";

function EditProfile() {
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
              <div className="w-full p-5 mt-10 bg-white rounded-lg shadow-md flex flex-col mr-8">
                {/* Header */}
                <h2 className="text-lg font-bold text-[#272d3b] mb-4 text-left">
                  Perusahaan
                </h2>
                <hr className="border-t border-[#e0e0e0] mb-4" />

                {/* Konten */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Logo Pengguna */}
                  <div className="flex items-center gap-4">
                    {/* Gambar Preview */}
                    <img
                      className="w-[60px] h-[60px] rounded-full"
                      src={imagePreview || "https://via.placeholder.com/60x60"} // Menampilkan gambar preview atau placeholder
                      alt="User Logo"
                    />
                    <div>
                      <p className="text-xs text-[#272d3b] opacity-50 text-left">
                        Logo Pengguna (Opsional)
                      </p>

                      {/* Hidden file input */}
                      <input
                        type="file"
                        id="fileInput"
                        className="hidden"
                        onChange={handleLogoChange} // Handle file selection
                      />

                      {/* Button to trigger file selection */}
                      <button
                        className="mt-2 px-3 py-1 bg-[#467469]/25 text-left text-xs font-bold text-[#467469] rounded-lg"
                        onClick={() =>
                          document.getElementById("fileInput").click()
                        }
                      >
                        Choose File
                      </button>
                    </div>
                  </div>

                  {/* Nama Pengguna */}
                  <div>
                    <label className="block text-sm text-[#3c4b64] mb-1 text-left">
                      Nama Perusahaan <span className="text-[#f24242]">*</span>
                    </label>
                    <input
                      type="text"
                      value="Pengguna"
                      disabled
                      className="w-full h-[40px] px-4 border rounded-full text-[#5c6873]"
                    />
                  </div>

                  {/* No. Telepon */}
                  <div className="col-span-2">
                    <label className="block text-sm text-[#3c4b64] mb-1 text-left">
                      No. Telepon <span className="text-[#f24242]">*</span>
                    </label>
                    <div className="flex">
                      <span className="inline-block px-4 bg-gray-100 pt-2 border rounded-l-full">
                        +62
                      </span>
                      <input
                        type="text"
                        placeholder="85831358991"
                        className="w-full h-[40px] px-4 border-t border-b border-r rounded-r-full text-[#5c6873]"
                      />
                    </div>
                  </div>

                  {/* Alamat */}
                  <div className="col-span-2">
                    <label className="block text-sm text-[#3c4b64] mb-1 text-left">
                      Alamat
                    </label>
                    <input
                      type="text"
                      placeholder="Nama Kota"
                      value={address}
                      onChange={handleAddressChange} // Bind address state
                      className="w-full h-[40px] px-4 border rounded-full mb-4 text-[#5c6873]"
                    />
                  </div>
                </div>
              </div>

              {/* Card 2*/}
              <div className="w-full p-5 mt-10 bg-white rounded-lg shadow-md flex flex-col mr-8">
                {/* Header */}
                <h2 className="text-lg font-bold text-[#272d3b] mb-4 text-left">
                  Profil Pengguna
                </h2>
                <hr className="border-t border-[#e0e0e0] mb-4" />

                {/* Konten */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm text-[#3c4b64] mb-1 text-left">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      placeholder="Nama Anda"
                      value={name}
                      onChange={handleNameChange} // Bind name state
                      className="w-full h-[40px] px-4 border rounded-full text-[#5c6873]"
                    />
                  </div>

                  {/* Email */}
                  <div className="col-span-2">
                    <label className="block text-sm text-[#3c4b64] mb-1 text-left">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={handleEmailChange} // Bind email state
                      placeholder="exam@email.com"
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
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
