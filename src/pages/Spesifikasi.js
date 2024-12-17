import { useState } from "react";
import Newsidebar from "../components/NewSidebar";
import Navbar from "../components/Navbar";
import VerificationCard from "../components/VerificationCard";
import SidebarMenu from "../components/SidebarMenu";

function Spesifikasi() {
  const [checkboxes, setCheckboxes] = useState({
    namaLengkap: false,
    email: false,
  });

  const handleCheckboxChange = (field) => {
    setCheckboxes({ ...checkboxes, [field]: !checkboxes[field] });
  };

  return (
    <div className="flex h-[920px] bg-gray-100 mb-8">
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
                <h2 className="text-lg font-bold text-[#272d3b] mb-8 text-left">
                  Spesifikasi Tambahan
                </h2>
                <hr className="border-t border-[#e0e0e0] mb-4" />
                <div className="grid grid-cols-2 gap-4">
                  {/* Nama Lengkap */}
                  <div className="col-span-2 flex items-center mb-6">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Contoh : Ukuran"
                        className="w-full h-[40px] px-4 border rounded-full text-[#5c6873]"
                      />
                    </div>
                    <input
                      type="checkbox"
                      checked={checkboxes.namaLengkap}
                      onChange={() => handleCheckboxChange("namaLengkap")}
                      className="ml-4 h-5 w-5"
                    />
                  </div>

                  {/* Email */}
                  <div className="col-span-2 flex items-center mb-6">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Contoh : Warna"
                        className="w-full h-[40px] px-4 border rounded-full text-[#5c6873]"
                      />
                    </div>
                    <input
                      type="checkbox"
                      checked={checkboxes.email}
                      onChange={() => handleCheckboxChange("email")}
                      className="ml-4 h-5 w-5"
                    />
                  </div>

                  <div className="col-span-2 flex items-center mb-16">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Contoh : Rasa"
                        className="w-full h-[40px] px-4 border rounded-full text-[#5c6873]"
                      />
                    </div>
                    <input
                      type="checkbox"
                      checked={checkboxes.email}
                      onChange={() => handleCheckboxChange("email")}
                      className="ml-4 h-5 w-5"
                    />
                  </div>
                </div>
              </div>
              {/* Button Simpan */}
              <div className="flex justify-end mt-6">
                <button
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

export default Spesifikasi;
