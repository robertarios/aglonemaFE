import { useState, useEffect } from "react";
import axios from "axios";
import Newsidebar from "../components/NewSidebar";
import Navbar from "../components/Navbar";
import VerificationCard from "../components/VerificationCard";
import SidebarMenu from "../components/SidebarMenu";

function EditProfile() {
  const [name, setName] = useState("");
  const [fullname, setNameUser] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState(""); // State untuk nomor telepon
  const [logo, setLogo] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [companyData, setCompanyData] = useState(null); // Untuk menyimpan data perusahaan

  // Ambil userId dari localStorage
  const userId = localStorage.getItem("userId");

  // Fetch data perusahaan saat komponen pertama kali dimuat
  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:5000/api/company/${userId}`)
        .then((response) => {
          const data = response.data;
          setCompanyData(data);
          setName(data.company_name);
          setEmail(data.email);
          setAddress(data.address);
          setPhone(data.phone);
          const imageUrl = data.logo
            ? `http://localhost:5000/${data.logo}`
            : "https://via.placeholder.com/60x60";
          setImagePreview(imageUrl);
        })
        .catch((error) => {
          console.error("Error fetching company data:", error);
        });
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:5000/api/users/${userId}`) // Ganti dengan URL API yang sesuai
        .then((response) => {
          const userData = response.data;
          setNameUser(userData.name); // Set name dari response
          setEmail(userData.email); // Set email dari response
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [userId]);

  // Fungsi untuk menangani perubahan input
  const handleNameChange = (event) => setName(event.target.value);
  const handleNameUserChange = (event) => setNameUser(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handleAddressChange = (event) => setAddress(event.target.value);
  const handlePhoneChange = (event) => setPhone(event.target.value);

  // Fungsi untuk menangani preview logo
  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    setLogo(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Fungsi untuk submit data ke backend
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Membuat form-data untuk mengirim file dan data lainnya
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("phone", phone); // Tambahkan nomor telepon
    if (logo) {
      formData.append("logo", logo);
    }

    try {
      // Update data perusahaan berdasarkan userId
      await axios.put(
        `http://localhost:5000/api/company/updateCompany/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
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
            <VerificationCard />
          </div>
          <div className="flex-1 mr-8">
            <div className="flex flex-col">
              <div className="w-full p-5 mt-10 bg-white rounded-lg shadow-md flex flex-col mr-8">
                <h2 className="text-lg font-bold text-[#272d3b] mb-4 text-left">
                  Perusahaan
                </h2>
                <hr className="border-t border-[#e0e0e0] mb-4" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      className="w-[60px] h-[60px] rounded-full"
                      src={imagePreview}
                      alt="User Logo"
                    />
                    <div>
                      <p className="text-xs text-[#272d3b] opacity-50 text-left">
                        Logo Pengguna (Opsional)
                      </p>
                      <input
                        type="file"
                        id="fileInput"
                        className="hidden"
                        onChange={handleLogoChange}
                      />
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
                  <div>
                    <label className="block text-sm text-[#3c4b64] mb-1 text-left">
                      Nama Perusahaan <span className="text-[#f24242]">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={handleNameChange}
                      className="w-full h-[40px] px-4 border rounded-full text-[#5c6873]"
                    />
                  </div>
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
                        value={phone} // Bind ke state nomor telepon
                        onChange={handlePhoneChange} // Update state
                        className="w-full h-[40px] px-4 border-t border-b border-r rounded-r-full text-[#5c6873]"
                      />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm text-[#3c4b64] mb-1 text-left">
                      Alamat
                    </label>
                    <input
                      type="text"
                      placeholder="Nama Kota"
                      value={address}
                      onChange={handleAddressChange}
                      className="w-full h-[40px] px-4 border rounded-full mb-4 text-[#5c6873]"
                    />
                  </div>
                </div>
              </div>

              <div className="w-full p-5 mt-10 bg-white rounded-lg shadow-md flex flex-col mr-8">
                <h2 className="text-lg font-bold text-[#272d3b] mb-4 text-left">
                  Profil Pengguna
                </h2>
                <hr className="border-t border-[#e0e0e0] mb-4" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm text-[#3c4b64] mb-1 text-left">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      placeholder="Nama Anda"
                      value={fullname}
                      onChange={handleNameUserChange}
                      className="w-full h-[40px] px-4 border rounded-full text-[#5c6873]"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm text-[#3c4b64] mb-1 text-left">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="exam@email.com"
                      disabled
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
