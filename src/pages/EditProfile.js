import { useState } from "react";
import Logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faBox,
  faDatabase,
  faWarehouse,
  faFileAlt,
  faCogs,
  faChevronDown, // Tambahkan ikon panah ke bawah
} from "@fortawesome/free-solid-svg-icons";

function EditProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [logo, setLogo] = useState(null);

  const handleNameChange = (event) => setName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePhoneNumberChange = (event) => setPhoneNumber(event.target.value);
  const handleAddressChange = (event) => setAddress(event.target.value);
  const handleLogoChange = (event) => setLogo(event.target.files[0]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Profile updated:", {
      name,
      email,
      phoneNumber,
      address,
      logo,
    });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 h-full bg-[#EDF3FF] shadow flex-col justify-start items-start">
        <div className="w-64 bg-[#EDF3FF] shadow flex-col justify-start items-start">
          {/* Logo */}
          <div className="px-4 py-4 bg-[#edf3ff] flex justify-center items-center">
            <img className="relative left-0 top-0" src={Logo} />
          </div>

          {/* Sidebar Menu */}
          <div className="h-[649.09px] bg-[#EDF3FF]">
            <div
              className={`pt-6 pb-8 flex justify-start items-center pl-5 pr-4 py-[13.51px] bg-[#DAE6FF]`}
            >
              <div className={`text-sm font-normal leading-[21px]`}>
                Nama Pengguna
              </div>
              <div className="ml-auto">
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`text-sm`}
                />
              </div>
            </div>

            <SidebarItem icon={faTachometerAlt} label="Dashboard" />
            <DropdownMenu icon={faBox} label="Produk" />
            <DropdownMenu icon={faDatabase} label="Pusat Data" />
            <DropdownMenu icon={faWarehouse} label="Gudang" />
            <DropdownMenu icon={faFileAlt} label="Laporan" />
            <SidebarItem icon={faCogs} label="Pengaturan" active />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-4">Edit Profile</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md"
        >
          <InputField label="Name" value={name} onChange={handleNameChange} />
          <InputField
            label="Email"
            value={email}
            onChange={handleEmailChange}
          />
          <InputField
            label="Phone Number"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
          <TextareaField
            label="Address"
            value={address}
            onChange={handleAddressChange}
          />
          <FileInput
            label="Upload Profile Picture"
            onChange={handleLogoChange}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, active }) {
  return (
    <div
      className={`h-[58.02px] py-[5px] flex justify-start items-center pl-5 pr-4 py-[13.51px] ${
        active ? "bg-[#457468]/40 border-l-4 border-[#16423c]" : ""
      }`}
    >
      <div className="w-10 flex justify-start items-center">
        <FontAwesomeIcon
          icon={icon}
          className={`text-sm ${active ? "text-[#16423c]" : "text-[#2f6d64]"}`}
        />
      </div>
      <div
        className={`text-sm font-normal leading-[21px] ${
          active ? "text-[#16423c]" : "text-[#2f6d64]"
        }`}
      >
        {label}
      </div>
    </div>
  );
}

function DropdownMenu({ icon, label }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div>
      <div
        className={`h-[58.02px] py-[5px] flex justify-start items-center pl-5 pr-4 py-[13.51px] cursor-pointer ${
          isOpen ? "bg-[#457468]/40 border-l-4 border-[#16423c]" : ""
        }`}
        onClick={toggleDropdown}
      >
        <div className="w-10 flex justify-start items-center">
          <FontAwesomeIcon
            icon={icon}
            className={`text-sm ${
              isOpen ? "text-[#16423c]" : "text-[#2f6d64]"
            }`}
          />
        </div>
        <div
          className={`text-sm font-normal leading-[21px] ${
            isOpen ? "text-[#16423c]" : "text-[#2f6d64]"
          }`}
        >
          {label}
        </div>
        <div className="ml-auto">
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`text-sm ${
              isOpen ? "text-[#16423c]" : "text-[#2f6d64]"
            }`}
          />
        </div>
      </div>
      {isOpen && (
        <div className="pl-12 bg-[#f4f7fb]">
          <SidebarItem label="Sub-menu 1" />
          <SidebarItem label="Sub-menu 2" />
          <SidebarItem label="Sub-menu 3" />
        </div>
      )}
    </div>
  );
}

function InputField({ label, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2">{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="border rounded w-full py-2 px-3"
        required
      />
    </div>
  );
}

function TextareaField({ label, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2">{label}</label>
      <textarea
        value={value}
        onChange={onChange}
        className="border rounded w-full py-2 px-3"
        required
      ></textarea>
    </div>
  );
}

function FileInput({ label, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2">{label}</label>
      <input
        type="file"
        onChange={onChange}
        className="border rounded w-full py-2 px-3"
      />
    </div>
  );
}

export default EditProfile;
