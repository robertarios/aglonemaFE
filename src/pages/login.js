import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import loginImage from "../assets/loginImage.png";
import logoIcon from "../assets/logoicon.png";

const Login = () => {
  const navigate = useNavigate();

  // State untuk menyimpan input form
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload on form submit

    // Menavigasi langsung ke /dashboard tanpa pemeriksaan input
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative font-poppins">
      {/* Logo Section */}
      <div className="absolute top-[30px] left-[30px] flex items-center space-x-2">
        <img
          src={logoIcon}
          alt="Aglostok logo"
          className="w-[69.06px] h-[69.06px]"
        />
        <h1 className="text-[35px] font-bold text-green-700">Aglostok</h1>
      </div>

      <div className="bg-white shadow-md rounded-lg flex w-full h-full min-h-screen">
        {/* Left Side - Form Section */}
        <div className="flex-1 px-8 py-16 flex flex-col justify-center ml-[132.65px] mt-[132.65px] max-w-[450px] space-y-6">
          <div className="flex justify-center items-center mb-8 text-gray-500 pb-10 space-x-10">
            <h4 className="text-[30px] font-bold text-green-700 cursor-pointer leading-[36px] relative">
              Login
              <span className="block h-[4px] w-[140px] bg-green-700 rounded-full mt-1 mx-auto"></span>
            </h4>
            <NavLink to="/signup">
              <h4 className="text-[30px] font-semibold text-gray-400 cursor-pointer leading-[36px]">
                Sign up
              </h4>
            </NavLink>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="relative flex flex-col">
              <div className="flex items-center bg-white shadow-md rounded-full h-[50px] px-4 border border-gray-200">
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
            </div>

            {/* Password Input */}
            <div className="relative flex flex-col">
              <div className="flex items-center bg-white shadow-md rounded-full h-[50px] px-4 border border-gray-200">
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
            </div>

            {/* Forgot Password */}
            <div className="text-right text-green-500 cursor-pointer">
              Forgot Password?
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full h-[50px] text-[20px] text-white bg-green-700 rounded-full hover:bg-green-800"
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
    </div>
  );
};

export default Login;
