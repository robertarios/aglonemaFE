import React from "react";
import { FaUser, FaEnvelope, FaPhone, FaLock } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logoIcon from "../assets/logoicon.png";
import signupImage from "../assets/signupImage.png";

const SignUp = () => {
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

          <form className="space-y-6">
            {/* Full Name Input */}
            <div className="relative flex items-center bg-white shadow-md rounded-full h-[62px] px-4 border border-gray-200">
              <FaUser className="text-[#457468] text-lg mr-4" />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full h-full pl-2 pr-4 text-gray-600 focus:outline-none rounded-full"
              />
            </div>

            {/* Email Input */}
            <div className="relative flex items-center bg-white shadow-md rounded-full h-[62px] px-4 border border-gray-200">
              <FaEnvelope className="text-[#457468] text-lg mr-4" />
              <input
                type="email"
                placeholder="Enter email"
                className="w-full h-full pl-2 pr-4 text-gray-600 focus:outline-none rounded-full"
              />
            </div>

            {/* Phone Number Input */}
            <div className="relative flex items-center bg-white shadow-md rounded-full h-[62px] px-4 border border-gray-200">
              <FaPhone className="text-[#457468] text-lg mr-4" />
              <input
                type="tel"
                placeholder="Enter phone no"
                className="w-full h-full pl-2 pr-4 text-gray-600 focus:outline-none rounded-full"
              />
            </div>

            {/* Password Input */}
            <div className="relative flex items-center bg-white shadow-md rounded-full h-[62px] px-4 border border-gray-200">
              <FaLock className="text-[#457468] text-lg mr-4" />
              <input
                type="password"
                placeholder="Enter password"
                className="w-full h-full pl-2 pr-12 text-gray-600 focus:outline-none rounded-full"
              />
            </div>

            {/* Confirm Password Input */}
            <div className="relative flex items-center bg-white shadow-md rounded-full h-[62px] px-4 border border-gray-200">
              <FaLock className="text-[#457468] text-lg mr-4" />
              <input
                type="password"
                placeholder="Confirm password"
                className="w-full h-full pl-2 pr-12 text-gray-600 focus:outline-none rounded-full"
              />
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="flex items-center space-x-2 text-gray-500">
              <input type="checkbox" className="form-checkbox h-4 w-4 text-green-600 rounded" />
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

            {/* Divider and Google Sign Up Button */}
            <div className="flex items-center justify-center space-x-4 text-gray-500">
              <span className="border-t border-gray-300 w-20"></span>
              <span>or sign up with</span>
              <span className="border-t border-gray-300 w-20"></span>
            </div>
            <button
              type="button"
              className="flex items-center justify-center w-full h-[50px] bg-white border border-gray-300 rounded-full shadow-md hover:shadow-lg"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" className="w-6 h-6 mr-2" />
              <span className="text-gray-600">Google</span>
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
