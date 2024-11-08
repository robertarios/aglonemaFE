import React from "react";
import warehouseImage from '../assets/gudangan.png'; // Ensure path to your image is correct
import automationImage from '../assets/gudangan1.png'; // Ensure path to your image is correct

// Import your custom icons
import affordableIcon from '../assets/comp1.png';
import flexibleIcon from '../assets/comp2.png';
import qualityIcon from '../assets/comp3.png';

const Landing = () => {
  return (
    <div className="text-center">
      {/* Hero Section */}
      <section className="bg-[#42675D] text-white px-8 py-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:space-x-8">
          <div className="flex-1 text-left">
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              Fulfillment Andalan Petani untuk Tingkatkan Penyimpanan Produk
            </h1>
            <p className="text-lg mt-4">
              Fokus kembangkan bisnismu di kawasan strategis tanpa perlu terbebani masalah operasional yang mahal dengan aglostok
            </p>
          </div>
          <div className="flex-1 mt-8 md:mt-0">
            <img src={warehouseImage} alt="Warehouse Illustration" className="w-full h-auto rounded-lg" />
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-white py-12 px-8 -mt-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <div className="text-[#62AA99] text-5xl mb-2">170+</div>
            <p className="text-gray-600">Gudang Mitra</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <div className="text-[#62AA99] text-5xl mb-2">40+</div>
            <p className="text-gray-600">Tersebar Diseluruh Kota Indonesia</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <div className="text-[#62AA99] text-5xl mb-2">2.3K+</div>
            <p className="text-gray-600">Sudah Banyak Petani Bergabung</p>
          </div>
        </div>
      </section>

      {/* New Automation Service Section */}
      <section className="bg-white py-8 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold">Solusi Layanan Yang Siap Otomasi Produkmu</h2>
          <p className="text-gray-600 mt-4 mb-8">
            Kami bantu otomasi produkmu mulai penyimpanan, baik untuk kamu para UMKM hingga korporasi skala besar
          </p>
          <div className="flex flex-col md:flex-row items-center md:space-x-8">
            <div className="flex-1">
              <img src={automationImage} alt="Automation Illustration" className="w-full h-auto rounded-lg" />
            </div>
            <div className="flex-1 text-left mt-8 md:mt-0">
              <h3 className="text-4xl font-light">Instant Fulfillment</h3>
              <p className="text-gray-600 mt-4">
                Ratusan pilihan gudang untuk bantu proses produk
              </p>
              <p className="text-gray-600 mt-2">
                Kapanpun dan dimanapun, Gudang Online Aglostok siap membantu operasional produk kamu dari proses pemasukan produk sampai pengeluaran
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Aglostok Section */}
      <section className="bg-white py-8 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold">Kenapa Harus Dengan Aglostok?</h2>
          <p className="text-gray-600 mt-4 mb-8">
            Kami mengerti apa yang paling kamu butuhkan untuk mengelola produkmu
          </p>

          {/* Features Section with Custom Icons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <img src={affordableIcon} alt="Affordable" className="w-16 h-16 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold">Paling Terjangkau</h3>
              <p className="text-gray-600 mt-2">
                Tidak Perlu Mahal untuk Tampil Profesional
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <img src={flexibleIcon} alt="Flexible" className="w-16 h-16 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold">Paling Fleksibel</h3>
              <p className="text-gray-600 mt-2">
                Layanan yang dapat disesuaikan setiap kebutuhan mulai dari penyimpanan digital
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <img src={qualityIcon} alt="Quality" className="w-16 h-16 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold">Kualitas Layanan Terbaik</h3>
              <p className="text-gray-600 mt-2">
                Kombinasi dari teknologi canggih & sistem yang mudah dimengerti
              </p>
              
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
