import React from "react";
import Iconverify from "../assets/verifycard.png";

const VerificationCard = () => (
  <div className="mx-8 mt-8 p-6 bg-white rounded-lg shadow-lg flex flex-col items-center">
    {/* Gambar */}
    <img src={Iconverify} alt="Verification" className="my-6" />

    {/* Teks */}
    <h2 className="text-xl font-semibold text-[#467469] mb-4 self-start">
      Verifikasi Akunmu!
    </h2>
    <p className="text-gray-500 text-sm mb-8 self-start text-left">
      Manfaatkan fitur lebih maksimal dengan verifikasi nomor handphonemu sekarang!
    </p>

    {/* Tombol Verifikasi */}
    <button className="mt-auto items-start bg-[#467469] text-white py-2 px-3 self-start rounded hover:bg-blue-600">
      Verifikasi Sekarang
    </button>
  </div>
);

export default VerificationCard;
