import { useState } from "react";
import Newsidebar from "../components/NewSidebar"; // Mengimpor Sidebar yang baru
import Navbar from "../components/Navbar";
import Iconverify from "../assets/verifycard.png";

function EditProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [logo, setLogo] = useState(null);

  // Handlers for input changes
  const handleNameChange = (event) => setName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handleAddressChange = (event) => setAddress(event.target.value);
  const handleLogoChange = (event) => setLogo(event.target.files[0]);

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
            <ul className="text-left">
              <li className="mx-8 p-3 text-start bg-white border-l-4 border-[#2f6d64]">
                <a href="#name" className="pl-4 text-[#2f6d64]">
                  Edit Profile
                </a>
              </li>
              <li className="mx-8 p-3 text-start ">
                <a href="#email" className="pl-4 text-[#2f6d64]">
                  Spesifikasi Tambahan
                </a>
              </li>
              <li className=" mx-8 p-3 text-start ">
                <a href="#email" className="pl-4 text-[#2f6d64]">
                  Pengaturan Kedaluarsa
                </a>
              </li>
              <li className=" mx-8 p-3 text-start ">
                <a href="#email" className="pl-4 text-[#2f6d64]">
                  Ubah Kata Sandi
                </a>
              </li>
              <li className=" mx-8 p-3 text-start ">
                <a href="#email" className="pl-4 text-[#2f6d64]">
                  Reset Data
                </a>
              </li>
            </ul>
            <div className="mx-8 mt-8 p-6  bg-white rounded-lg shadow-lg flex flex-col items-center">
              {/* Gambar */}
              <img src={Iconverify} alt="Verification" className=" my-6" />

              {/* Teks */}
              <h2 className="text-xl font-semibold text-gray-700 mb-4 self-start">
                Verifikasi Akunmu
              </h2>
              <p className="text-gray-500 text-sm mb-8 self-start text-left">
                Silakan verifikasi akun Anda untuk mendapatkan akses penuh ke
                layanan kami.
              </p>

              {/* Tombol Verifikasi */}
              <button className="mt-auto items-start bg-blue-500 text-white py-2 px-6 self-start rounded hover:bg-blue-600 self-start">
                Verifikasi
              </button>
            </div>
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
                    <img
                      className="w-[60px] h-[60px] rounded-full"
                      src="https://via.placeholder.com/60x60"
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

                      {/* Button that triggers file selection */}
                      <button
                        className="mt-2 px-3 py-1 bg-[#467469]/25 text-xs font-bold text-[#467469] rounded-lg"
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
                      Nama Pengguna <span className="text-[#f24242]">*</span>
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
                      <span className="inline-block px-4 bg-gray-100 border rounded-l-full">
                        +62
                      </span>
                      <input
                        type="text"
                        value="85831358991"
                        disabled
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
                  className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
                >
                  Save Changes
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
