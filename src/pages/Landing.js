import React from "react";
import warehouseImage from '../assets/gudangan.png';
import automationImage from '../assets/gudangan1.png';
import logo from '../assets/logo.png';
import affordableIcon from '../assets/comp1.png';
import flexibleIcon from '../assets/comp2.png';
import qualityIcon from '../assets/comp3.png';
import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";

import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center">

      {/* Navbar Section */}
      <div className="relative fixed w-full">
      <nav className="bg-[#42675D] px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="Aglostok Logo" className="h-10 mr-2" />
        </div>
        
        <div className="flex items-center space-x-6">
          {/* Navigation Links */}
          <ul className="flex space-x-6 text-white">
            <li>
              <a href="#products" className="hover:underline">
                Produk
              </a>
            </li>
            <li>
              <a href="#about" className="hover:underline">
                Tentang
              </a>
            </li>
          </ul>

          <button
            className="bg-white text-[#42675D] font-bold py-2 px-4 rounded-lg hover:bg-gray-100"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
          <button
            className="bg-[#2F4A3B] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#3b5b4a]"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </button>
        </div>
      </nav>
    </div>

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
      <section className="bg-white py-8 px-8 pb-20">
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

      {/* Footer Section */}
      <footer
        style={{
          backgroundColor: "#466b5d",
          color: "white",
          padding: "40px",
          position: "relative",
        }}
      >
        {/* Newsletter Card */}
        <div style={{ marginTop: "-50px", marginBottom: "20px" }}>
          {/* Newsletter Card Section */}
      <div
        className="newsletter-container"
        style={{
          backgroundColor: '#62AA99',
          padding: '30px',
          borderRadius: '15px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '-60px',
          position: 'relative',
          zIndex: 1,
          maxWidth: '80%',
          margin: '0 auto',
          transform: 'translateY(-30%)',
        }}
      >
        {}
        <div className="newsletter-text" style={{ flex: 1, textAlign: 'left', color: 'white', paddingRight: '20px' }}>
          <h1 style={{ fontSize: '34px', margin: 0 }}>Dapatkan Berita Terbaru</h1>
          <p style={{ fontSize: '14px', margin: 0 }}>
            Jadi yang pertama tahu info terbaru soal fitur, promosi, dan berbagai update lainnya dari AgloStok
          </p>
        </div>

        {}
        <div
          className="newsletter-input-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: '30px',
            padding: '5px 10px',
          }}
        >
          <input
            type="email"
            placeholder="Masukkan email kamu"
            style={{
              color: 'black',
              backgroundColor: 'transparent',
              padding: '10px',
              border: 'none',
              outline: 'none',
              borderRadius: '20px',
              width: '200px',
              marginRight: '10px',
            }}
          />
          <button
            style={{
              padding: '10px 20px',
              borderRadius: '20px',
              border: 'none',
              backgroundColor: '#1b423b',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Berlangganan Sekarang
          </button>
        </div>
      </div>
        </div>

        {/* Footer Main Content */}
        <div
          className="footer-container"
          style={{
            display: "flex",
            justifyContent: "space-around",
            paddingTop: "20px",
            borderTop: "1px solid #3a5c4c",
            flexWrap: "wrap",
          }}
        >
          {/* Logo and Contact Info */}
          <div className="footer-column" style={{ textAlign: "left" }}>
            <img
              src={logo}
              alt="AgloStok Logo"
              style={{ width: "100px", marginBottom: "20px" }}
            />
            <p>Layanan Pengaduan Konsumen :</p>
            <a
              href="mailto:customer@aglostok.com"
              style={{ color: "#7c948c", textDecoration: "none" }}
            >
              customer@aglostok.com
            </a>
          </div>

          {/* Other Links - About, Platform, Help */}
          <div className="footer-column" style={{ textAlign: "left" }}>
            <h4 style={{ fontSize: "18px", marginBottom: "10px" }}>AgloStok</h4>
            <ul style={{ listStyle: "none", padding: "0" }}>
              <li>
                <a
                  href="#about"
                  style={{ color: "#7c948c", textDecoration: "none" }}
                >
                  Tentang Kami
                </a>
              </li>
              <li>
                <a
                  href="#fulfillment"
                  style={{ color: "#7c948c", textDecoration: "none" }}
                >
                  Simulasi Biaya Fulfillment
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  style={{ color: "#7c948c", textDecoration: "none" }}
                >
                  Kontak Kami
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-column" style={{ textAlign: "left" }}>
            <h4 style={{ fontSize: "18px", marginBottom: "10px" }}>Platform</h4>
            <ul style={{ listStyle: "none", padding: "0" }}>
              <li>
                <a
                  href="#partner"
                  style={{ color: "#7c948c", textDecoration: "none" }}
                >
                  Jadi Mitra
                </a>
              </li>
              <li>
                <a
                  href="#partners"
                  style={{ color: "#7c948c", textDecoration: "none" }}
                >
                  Mitra Kami
                </a>
              </li>
              <li>
                <a
                  href="#others"
                  style={{ color: "#7c948c", textDecoration: "none" }}
                >
                  Mitra Lainnya
                </a>
              </li>
              <li>
                <a
                  href="#warehouse"
                  style={{ color: "#7c948c", textDecoration: "none" }}
                >
                  Warehouse Management System
                </a>
              </li>
              <li>
                <a
                  href="#seller"
                  style={{ color: "#7c948c", textDecoration: "none" }}
                >
                  Seller Management System
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-column" style={{ textAlign: "left" }}>
            <h4 style={{ fontSize: "18px", marginBottom: "10px" }}>
              Bantuan & Panduan
            </h4>
            <ul style={{ listStyle: "none", padding: "0" }}>
              <li>
                <a
                  href="#faq"
                  style={{ color: "#7c948c", textDecoration: "none" }}
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#terms"
                  style={{ color: "#7c948c", textDecoration: "none" }}
                >
                  Syarat & Ketentuan
                </a>
              </li>
              <li>
                <a
                  href="#privacy"
                  style={{ color: "#7c948c", textDecoration: "none" }}
                >
                  Kebijakan Privasi
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div
          className="footer-bottom"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "20px",
            borderTop: "1px solid #3a5c4c",
            flexWrap: "wrap",
          }}
        >
          <p style={{ marginBottom: "10px" }}>
            Copyright © 2024 By Aglostok. All Rights Reserved.
          </p>
          <div
            className="footer-links"
            style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}
          >
            <a href="#instagram" style={{ color: "white" }}>
              <FaInstagram size={20} />
            </a>
            <a href="#facebook" style={{ color: "white" }}>
              <FaFacebook size={20} />
            </a>
            <a href="#twitter" style={{ color: "white" }}>
              <FaTwitter size={20} />
            </a>
            <a href="#linkedin" style={{ color: "white" }}>
              <FaLinkedin size={20} />
            </a>
            <a href="#tiktok" style={{ color: "white" }}>
              <FaTiktok size={20} />
            </a>
            <a href="#youtube" style={{ color: "white" }}>
              <FaYoutube size={20} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
