import React from "react";
import { FaEye, FaEnvelope, FaLock } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import loginImage from "../assets/loginImage.png";
import logoIcon from "../assets/logoicon.png";

const Login = () => {
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

          <form className="space-y-6">
          <div className="relative flex items-center bg-white shadow-md rounded-full h-[62px] px-4 border border-gray-200">
              <FaEnvelope className="text-[#457468] text-lg mr-4" />
              <input
                type="email"
                placeholder="Enter email"
                className="w-full h-full pl-2 pr-4 text-gray-600 focus:outline-none rounded-full"
              />
            </div>
            <div className="relative flex items-center bg-white shadow-md rounded-full h-[62px] px-4 border border-gray-200">
              <FaLock className="text-[#457468] text-lg mr-4" />
              <input
                type="password"
                placeholder="Enter password"
                className="w-full h-full pl-2 pr-12 text-gray-600 focus:outline-none rounded-full"
              />
            </div>
            <div className="text-right text-green-500 cursor-pointer">
              Forgot Password?
            </div>
            <button
              type="submit"
              className="w-full h-[62px] text-[20px] text-white bg-green-700 rounded-full hover:bg-green-800">
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
