import React, { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaLock } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logoIcon from "../assets/logoicon.png";
import signupImage from "../assets/signupImage.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";



const SignUp = () => {
  const navigate = useNavigate();
  // State untuk menyimpan data form
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    role: "admin",
    confirmPassword: "",
  });

  const [selectedRole, setSelectedRole] = useState("admin")

 // Handle changing the role based on selected option
 const handleRoleChange = (event) => {
  const { value } = event.target;
  setFormData({
    ...formData,
    role: value, // Change the status field based on the selected option
  });
};

  // State untuk pesan error di setiap field
  const [fieldErrors, setFieldErrors] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // State untuk modal sukses
  const [showModal, setShowModal] = useState(false);
  // Handle perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Hapus error saat field diisi ulang
    setFieldErrors({ ...fieldErrors, [name]: "" });
  };

  const [error, setError] = useState("");

  // Fungsi untuk validasi password
  const isPasswordStrong = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/;
    return passwordRegex.test(password);
  };

  // Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input
    let errors = {};
    if (!formData.fullname) errors.fullname = "Full Name is required.";
    if (!formData.email) errors.email = "Email is required.";
    if (!formData.phone) errors.phone = "Phone number is required.";
    if (!isPasswordStrong(formData.password)) {
      errors.password =
        "Password must be at least 8 characters, include uppercase, lowercase, number, and symbol.";
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors); // Set pesan error jika ada
      return;
    }

    setFormData({
      ...formData,
      ["role"]: selectedRole, // selected role
    });

    try {
      // Kirim data ke backend
      const response = await axios.post(
        "http://localhost:5000/api/users/signup",
        formData
      );

      // Tampilkan modal sukses
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false); // Tutup modal setelah 3 detik
        navigate("/login"); // Redirect ke halaman login
      }, 3000);
    } catch (err) {
      // Tangani error dari backend
      setFieldErrors({
        email: err.response?.data?.error || "Something went wrong!",
      });
    }
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
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "text-[40px] font-semibold text-green-700 leading-[36px] relative"
                  : "text-[40px] font-semibold text-gray-400 leading-[36px]"
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive
                  ? "text-[40px] font-bold text-green-700 leading-[36px] relative"
                  : "text-[40px] font-semibold text-gray-400 leading-[36px]"
              }
            >
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
            <div className="relative flex flex-row items-center">
              <div className="flex flex-col w-full">
                <div className="flex items-center bg-white shadow-md rounded-full h-[62px] px-4 border border-gray-200">
                  <FaUser className="text-[#457468] text-lg mr-4" />
                  <input
                    type="text"
                    name="fullname"
                    placeholder="Full Name"
                    value={formData.fullname}
                    onChange={handleChange}
                    className="w-full h-full pl-2 pr-4 text-gray-600 focus:outline-none rounded-full"
                  />
                </div>
                {/* Error Message */}
                {fieldErrors.fullname && (
                  <p className="text-red-500 text-sm ml-2 pl-2 w-[150px] text-left">
                    {fieldErrors.fullname}
                  </p>
                )}
              </div>
            </div>

            {/* Email Input */}
            <div className="relative flex flex-row items-center">
              <div className="flex flex-col w-full">
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
                {/* Error Message */}
                {fieldErrors.email && (
                  <p className="text-red-500 text-sm ml-2 pl-2 w-[150px] text-left">
                    {fieldErrors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Phone Number Input */}
            <div className="relative flex flex-row items-center">
              <div className="flex flex-col w-full">
                <div className="flex items-center bg-white shadow-md rounded-full h-[62px] px-4 border border-gray-200">
                  <FaPhone className="text-[#457468] text-lg mr-4" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full h-full pl-2 pr-4 text-gray-600 focus:outline-none rounded-full"
                  />
                </div>
                {/* Error Message */}
                {fieldErrors.phone && (
                  <p className="text-red-500 text-sm ml-2 pl-2 w-auto text-left whitespace-nowrap">
                    {fieldErrors.phone}
                  </p>
                )}
              </div>
            </div>

            {/* Role Input */}
            <div className="relative flex flex-row items-center">
              <div className="flex flex-col w-full">
                <div className="flex items-center bg-white shadow-md rounded-full h-[62px] px-4 border border-gray-200">
                <FaUser className="text-[#457468] text-lg mr-4" />
                  <label htmlFor="dropdown">Select Role:</label>
                    <select id="dropdown" value={formData.role} onChange={handleRoleChange}>
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                </div>
              </div>
            </div>

            {/* Password Input */}
            <div className="relative flex flex-row items-center">
              <div className="flex flex-col w-full">
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
                {/* Error Message */}
                {fieldErrors.password && (
                  <p className="text-red-500 text-sm ml-2 pl-2 w-[250px] text-left">
                    {fieldErrors.password}
                  </p>
                )}
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className="relative flex flex-row items-center">
              <div className="flex flex-col w-full">
                <div className="flex items-center bg-white shadow-md rounded-full h-[62px] px-4 border border-gray-200">
                  <FaLock className="text-[#457468] text-lg mr-4" />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full h-full pl-2 pr-4 text-gray-600 focus:outline-none rounded-full"
                  />
                </div>
                {/* Error Message */}
                {fieldErrors.confirmPassword && (
                  <p className="text-red-500 text-sm ml-2 pl-2 w-auto text-left whitespace-nowrap">
                    {fieldErrors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="flex items-center space-x-2 text-gray-500">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-green-600 rounded"
                required
              />
              <p className="text-sm">
                By signing up you agree to our{" "}
                <span className="text-green-700 cursor-pointer">
                  terms & conditions
                </span>{" "}
                of use and{" "}
                <span className="text-green-700 cursor-pointer">
                  privacy policy
                </span>
                .
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
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-green-700 text-2xl font-semibold mb-4">
              Sign Up Successful!
            </h2>
            <p className="text-gray-600">
              You have successfully created an account.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Redirecting to login page...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
