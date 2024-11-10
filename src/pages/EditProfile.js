import { useState } from "react";
import Newsidebar from "../components/NewSidebar"; // Mengimpor Sidebar yang baru
import Navbar from "../components/Navbar";
import Iconverify from "../assets/verifycard.png";

function EditProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [logo, setLogo] = useState(null);

  const handleNameChange = (event) => setName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePhoneNumberChange = (event) => setPhoneNumber(event.target.value);
  const handleAddressChange = (event) => setAddress(event.target.value);
  const handleLogoChange = (event) => setLogo(event.target.files[0]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Profile updated:", {
      name,
      email,
      phoneNumber,
      address,
      logo,
    });
  };

  return (
    <div className="flex h-full bg-gray-100">
      {/* Sidebar */}
      <Newsidebar /> {/* Menggunakan Sidebar yang sudah terpisah */}
      {/* Main Content */}
      <div className="flex-1">
        <Navbar />
        <div className="flex">
          {/* Left Side: Menu Edit Profile */}
          <div className="w-1/4 py-10 mr-6">
            <ul>
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
              <img
                src={Iconverify} // Ganti URL ini dengan URL gambar yang sesuai
                alt="Verification"
                className=" my-6"
              />

              {/* Teks */}
              <h2 className="text-xl justify-start font-semibold text-gray-700 mb-4 self-start">
                Verifikasi Akunmu
              </h2>
              <p className="text-gray-500 text-start text-sm mb-8">
                Silakan verifikasi akun Anda untuk mendapatkan akses penuh ke
                layanan kami.
              </p>

              {/* Tombol Verifikasi */}
              <button className="mt-auto items-start bg-blue-500 text-white py-2 px-6 self-start rounded hover:bg-blue-600">
                Verifikasi
              </button>
            </div>
          </div>

          {/* Right Side: Form and Cards */}
          <div className="flex-1">
            <h1 className="text-2xl font-semibold mb-4">Edit Profile</h1>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 rounded shadow-md mb-6"
            >
              <InputField
                label="Name"
                value={name}
                onChange={handleNameChange}
              />
              <InputField
                label="Email"
                value={email}
                onChange={handleEmailChange}
              />
              <InputField
                label="Phone Number"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
              />
              <TextareaField
                label="Address"
                value={address}
                onChange={handleAddressChange}
              />
              <FileInput
                label="Upload Profile Picture"
                onChange={handleLogoChange}
              />
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Save Changes
              </button>
            </form>

            {/* Cards Section */}
            <div className="flex space-x-6">
              <div className="w-1/2 bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Card 1</h2>
                <p>This is the first card content.</p>
              </div>
              <div className="w-1/2 bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Card 2</h2>
                <p>This is the second card content.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2">{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="border rounded w-full py-2 px-3"
        required
      />
    </div>
  );
}

function TextareaField({ label, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2">{label}</label>
      <textarea
        value={value}
        onChange={onChange}
        className="border rounded w-full py-2 px-3"
        required
      ></textarea>
    </div>
  );
}

function FileInput({ label, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2">{label}</label>
      <input
        type="file"
        onChange={onChange}
        className="border rounded w-full py-2 px-3"
      />
    </div>
  );
}

export default EditProfile;
