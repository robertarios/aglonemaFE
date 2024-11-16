import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import loginImage from "../assets/loginImage.png";
import logoIcon from "../assets/logoicon.png";

const Login = () => {
  const navigate = useNavigate();

  // State untuk menyimpan input form
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
   // State untuk pesan error di setiap field
   const [fieldErrors, setFieldErrors] = useState({
    email: "",
    password: "",
  });

  // State untuk pesan error
  const [successMessage, setSuccessMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  
  // Handle perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Hapus error untuk field yang diisi ulang
    setFieldErrors({ ...fieldErrors, [name]: "" });
  };


  // Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input kosong
    let errors = {};
    if (!formData.email) {
      errors.email = "Email is required.";
    }
    if (!formData.password) {
      errors.password = "Password is required.";
    }

    // Jika ada error, set state dan hentikan proses
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    try {
      // Kirim data ke backend
      const response = await axios.post("http://localhost:5000/api/users/login", {
        email: formData.email,
        password: formData.password,
      });

      // Jika login berhasil
      setSuccessMessage(response.data.message); // Simpan pesan sukses
      setShowModal(true); // Tampilkan modal
      setTimeout(() => {
        setShowModal(false); // Tutup modal setelah 3 detik
        navigate("/dashboard"); // Redirect ke dashboard
      }, 3000);
    } catch (err) {
      // Tangani error dari backend
      setFieldErrors({
        email: "",
        password: err.response?.data?.error || "Invalid credentials.",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative font-poppins">
      {/* Logo Section */}
      <div className="absolute top-[30px] left-[30px] flex items-center space-x-2">
        <img src={logoIcon} alt="Aglostok logo" className="w-[69.06px] h-[69.06px]" />
        <h1 className="text-[35px] font-bold text-green-700">Aglostok</h1>
      </div>

      <div className="bg-white shadow-md rounded-lg flex w-full h-full min-h-screen">
        {/* Left Side - Form Section */}
        <div className="flex-1 px-8 py-16 flex flex-col justify-center ml-[132.65px] mt-[132.65px] max-w-[450px] space-y-6">
          <div className="flex justify-center items-center mb-8 text-gray-500 pb-10 space-x-10">
            <h2 className="text-[40px] font-bold text-green-700 cursor-pointer leading-[36px] relative">
              Login
              <span className="block h-[4px] w-[140px] bg-green-700 rounded-full mt-1 mx-auto"></span>
            </h2>
            <NavLink to="/signup">
              <h2 className="text-[40px] font-semibold text-gray-400 cursor-pointer leading-[36px]">
                Sign up
              </h2>
            </NavLink>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
          

            {/* Email Input */}
            <div className="relative flex flex-col">
              <div className="flex items-center bg-white shadow-md rounded-full h-[62px] px-4 border border-gray-200">
                <FaEnvelope className="text-[#457468] text-lg mr-4" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-full pl-2 pr-4 text-gray-600 focus:outline-none rounded-full"
                />
              </div>
               {/* Error Message for Email (Baru Ditambahkan) */}
               {fieldErrors.email && <p className="text-red-500 text-sm ml-2 pl-2 w-[150px] text-left">{fieldErrors.email}</p>}
            </div>

            {/* Password Input */}
            <div className="relative flex flex-col">
              <div className="flex items-center bg-white shadow-md rounded-full h-[62px] px-4 border border-gray-200">
                <FaLock className="text-[#457468] text-lg mr-4" />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full h-full pl-2 pr-4 text-gray-600 focus:outline-none rounded-full"
                />
              </div>
              {/* Error Message for Password (Baru Ditambahkan) */}
              {fieldErrors.password && <p className="text-red-500 text-sm ml-2 pl-2 w-[150px] text-left">{fieldErrors.password}</p>}
            </div>

            {/* Forgot Password */}
            <div className="text-right text-green-500 cursor-pointer">
              Forgot Password?
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full h-[62px] text-[20px] text-white bg-green-700 rounded-full hover:bg-green-800"
            >
              Login
            </button>
          </form>
        </div>

        {/* Right Side - Image Section */}
        <div className="hidden md:block flex-1 relative pt-[100px]">
          <img
            src={loginImage}
            alt="Farmers illustration"
            className="w-[900px] h-[500px] object-cover mx-auto"
          />
        </div>
      </div>

       {/* Modal untuk pesan sukses */}
       {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-green-700 text-2xl font-semibold mb-4">Success!</h2>
            <p className="text-gray-600">{successMessage}</p>
            <p className="text-sm text-gray-500 mt-4">Redirecting to dashboard...</p>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default Login;
