import React from "react";
import NewsletterCard from "./NewsletterCard";
import logo from "../assets/logo.png";
import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <style>
        {`
          /* Responsive styles */
          @media (max-width: 768px) {
            .footer-container {
              flex-direction: column;
              align-items: center;
              text-align: center;
            }
            .footer-column {
              margin-bottom: 20px;
            }
            .footer-bottom {
              flex-direction: column;
              align-items: center;
              text-align: center;
            }
            .footer-links {
              justify-content: center;
            }
          }
        `}
      </style>

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
          <NewsletterCard />
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
    </>
  );
};

export default Footer;
