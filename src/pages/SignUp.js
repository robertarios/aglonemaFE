import React, { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaLock } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logoIcon from "../assets/logoicon.png";
import signupImage from "../assets/signupImage.png";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi password dan confirm password
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Kirim data ke API
      const response = await axios.post("http://localhost:5000/api/users/signup", {
        fullname: formData.fullname,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      // Tampilkan pesan sukses dan alihkan ke halaman login
      alert(response.data.message);
      navigate("/login");
    } catch (err) {
      // Tampilkan pesan error dari backend
      setError(err.response.data.error || "Something went wrong!");
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
            <NavLink to="/login" className={({ isActive }) => isActive ? "text-[40px] font-semibold text-green-700 leading-[36px] relative" : "text-[40px] font-semibold text-gray-400 leading-[36px]"}>
              Login
            </NavLink>
            <NavLink to="/signup" className={({ isActive }) => isActive ? "text-[40px] font-bold text-green-700 leading-[36px] relative" : "text-[40px] font-semibold text-gray-400 leading-[36px]"}>
              Sign up
              {window.location.pathname === "/signup" && (
                <span className="block h-[4px] w-[140px] bg-green-700 rounded-full mt-1 mx-auto"></span>
              )}
            </NavLink>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Error Message */}
            {error && <div className="text-red-500 text-sm">{error}</div>}

            {/* Full Name Input */}
            <div className="relative flex items-center bg-white shadow-md rounded-full h-[62px] px-4 border border-gray-200">
              <FaUser className="text-[#457468] text-lg mr-4" />
              <input
                type="text"
                name="fullname"
                placeholder="Full Name"
                value={formData.fullname}
                onChange={handleChange}
                className="w-full h-full pl-2 pr-4 text-gray-600 focus:outline-none rounded-full"
                required
              />
            </div>

            {/* Email Input */}
            <div className="relative flex items-center bg-white shadow-md rounded-full h-[62px] px-4 border border-gray-200">
              <FaEnvelope className="text-[#457468] text-lg mr-4" />
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                className="w-full h-full pl-2 pr-4 text-gray-600 focus:outline-none rounded-full"
                required
              />
            </div>

            {/* Phone Number Input */}
            <div className="relative flex items-center bg-white shadow-md rounded-full h-[62px] px-4 border border-gray-200">
              <FaPhone className="text-[#457468] text-lg mr-4" />
              <input
                type="tel"
                name="phone"
                placeholder="Enter phone no"
                value={formData.phone}
                onChange={handleChange}
                className="w-full h-full pl-2 pr-4 text-gray-600 focus:outline-none rounded-full"
              />
            </div>

            {/* Password Input */}
            <div className="relative flex items-center bg-white shadow-md rounded-full h-[62px] px-4 border border-gray-200">
              <FaLock className="text-[#457468] text-lg mr-4" />
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                className="w-full h-full pl-2 pr-12 text-gray-600 focus:outline-none rounded-full"
                required
              />
            </div>

            {/* Confirm Password Input */}
            <div className="relative flex items-center bg-white shadow-md rounded-full h-[62px] px-4 border border-gray-200">
              <FaLock className="text-[#457468] text-lg mr-4" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full h-full pl-2 pr-12 text-gray-600 focus:outline-none rounded-full"
                required
              />
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="flex items-center space-x-2 text-gray-500">
              <input type="checkbox" className="form-checkbox h-4 w-4 text-green-600 rounded" required />
              <p className="text-sm">
                By signing up you agree to our{" "}
                <span className="text-green-700 cursor-pointer">terms & conditions</span> of use and{" "}
                <span className="text-green-700 cursor-pointer">privacy policy</span>.
              </p>
            </div>

            {/* Create Account Button */}
            <button
              type="submit"
              className="w-full h-[62px] text-[20px] text-white bg-green-700 rounded-full hover:bg-green-800"
            >
              Create Account
            </button>
          </form>
        </div>

        {/* Right Side - Image Section */}
        <div className="hidden md:block flex-1 relative pt-[50px] pr-[50px]">
          <img
            src={signupImage}
            alt="Signup illustration"
            className="w-[500px] h-[600px] object-cover mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
