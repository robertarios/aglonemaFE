import { useState } from "react";
import Newsidebar from "../components/NewSidebar"; // Mengimpor Sidebar yang baru
import Navbar from "../components/Navbar";
import Iconverify from "../assets/verifycard.png";
import VerificationCard from "../components/VerificationCard";
import SidebarMenu from "../components/SidebarMenu";

function ResetData() {
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
    <div className="flex h-[920px] bg-gray-100 ">
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
              <div className="w-full p-5 mt-10 px-5 rounded-lg shadow-sm  border flex flex-col mr-8">
                <div class="text-black font-semibold text-sm leading-[21px]">
                  Perhatian: Tindakan reset data tidak dapat dibatalkan.
                  Pastikan untuk membuat backup sebelum melakukan reset
                </div>
              </div>

              {/* Card 2*/}
              <div className="w-full p-6 mt-10 bg-white rounded-lg shadow-md flex flex-col mr-8">
                {/* Header */}
                <h2 className="text-lg font-bold text-[#272d3b] mt-2 mb-8 text-left">
                  Reset Data Sistem
                </h2>

                {/* Konten */}
                <div className="grid grid-cols-10 border rounded-lg">
                  <div className="col-span-0">
                    <img
                      className="w-[35px] mx-5 mt-8"
                      src="https://s3-alpha-sig.figma.com/img/5858/7463/6c0c41fe009b316f3c6c00ef8883671b?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VvKbHOHh547EuQwWFtTf06i36cQXSmImibjfdU290I7zq0SIo12O6bhF68Te6IsKXp8qFcqpEf9kJ7oMgo6H4DF3AEmiOX9czavnuzYol-PpmFCb2bu2-kHJ9PMCBTvorXgeejQD4JCgsKv82d24tEziw5gqb-U-y5xzF7MjLtxrnFapUDlN7~6THWCDrdZNA-rAto9Do03Cnm1lZ73ZhDNDDksuu2dt8IkjK0gN9IkRo3q85kCkyoQh1OpuKs~Px0VjWgz5sAh1KH6t3MzmC9VmhSo7nBeEqy2hK6xLzG7uYfE4oYGghaauMvj6tRUSararbUhcEgjQQsf6f-hFLQ__"
                    />
                  </div>
                  <div className="col-span-7 text-left ">
                    <div class="h-5 text-black text-md mt-8 font-normal leading-[21px]">
                      Reset Data Stok
                    </div>
                    <div className="text-[#9b9b9b] text-sm font-normal mt-2 mb-16 leading-[21px]">
                      Menghapus semua data stok barang termasuk riwayat masuk
                      dan keluar
                    </div>
                  </div>
                  <div className="col-span-2 text-right">
                    <button
                      className="mt-24 mb-1 mr-4 rounded-md bg-[#f24242] py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-[#f24242] focus:shadow-none active:bg-orange-600 hover:bg-orange-800 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                      type="button"
                    >
                      Reset Data Stok
                    </button>
                  </div>
                </div>


                {/* Konten */}
                <div className="grid grid-cols-10 border rounded-lg mt-4 mb-20">
                  <div className="col-span-0">
                    <img
                      className="w-[39px] mx-5 mt-8"
                      src="https://s3-alpha-sig.figma.com/img/9cdc/627e/85fe5379507c51cb01db5c61416ce90e?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WhaxGa2hdrk9cRY42gWOw8LMCqF5oLuik1lZRxLLiCIiaDWKem51p7VEs78JQBVYaSUta-zeN4ozAJ5esv~H1E2Gta-bT6ZZnX3EPz0DFdLirWIoR7QHKsKd4rl0lPCFFuvPWYBT4QCiVB1x0UDgbr0edi-1VRm9JVQIf5WCKnBMgWJNUJZBhF5-WkiDgMqYcBU9p1xvB~Iyk3OuiZGOY3kWDhYxTdDO-f~o0KGAV2QsflIDSCqaYwThAh4vHSvScYW9MYuXbe4pGllVV64NUoXCyGgrQnhcJF2ZBoLGufUBzTUD6Zy~G1finhUBtuuO4VPKAmvwtWNxcdXtKrA2EQ__"
                    />
                  </div>
                  <div className="col-span-7 text-left ">
                    <div class="h-5 text-black text-md mt-8 font-normal leading-[21px]">
                     Reset Seluruh Data Sistem
                    </div>
                    <div className="text-[#9b9b9b] text-sm font-normal mt-2 mb-16 leading-[21px]">
                    Menghapus seluruh data sistem dan mengembalikan ke pengaturan awal
                    </div>
                  </div>
                  <div className="col-span-2 text-right">
                    <button
                      className="mt-24 mb-1 mr-4 rounded-md bg-[#f24242] py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-[#f24242] focus:shadow-none active:bg-orange-600 hover:bg-orange-800 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                      type="button"
                    >
                      Reset Sistem
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetData;
