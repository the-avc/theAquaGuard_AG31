import React, { useState } from 'react';
import Logo from '../assets/logo3.jpg';
import { FaTint } from 'react-icons/fa';
import { LuShield } from 'react-icons/lu';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => setIsOpen(!isOpen);

    return (
        <nav className="bg-teal-50 sticky top-0 z-10 shadow-md">
            <div className="container mx-auto flex justify-between items-center pr-5 py-3 pl-6">
                {/* Left: Logo */}
                <div className="flex items-center space-x-4 ">
                    {/* <img src={Logo} alt="Logo" className="w-28 object-cover" /> */}
                    <a href="/" className="font-bold text-teal-800">
                     <div className="flex items-center gap-3 space-y-2">
                        <div className="bg-blue-700 w-16 h-16 rounded-full flex items-center justify-center shadow-lg relative">
                            <FaTint className="text-white w-5 h-5" />
                            <LuShield className="text-white w-11 h-11 absolute" />
                        </div>
                        <div className='text-center'>
                            <h1 className="text-3xl font-bold text-blue-900">AquaGuard</h1>
                            <p className="text-base text-gray-600">Pani ka Doctor</p>
                        </div>
                    </div>
                    </a>
                   

                </div>

                {/* Toggler Icon */}
                <button
                    className="block md:hidden p-2 text-teal-700 hover:bg-teal-200 rounded transition"
                    onClick={toggleNavbar}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-8 h-8"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d={!isOpen ? "M4 6h16M4 12h16M4 18h16" : "M6 18L18 6M6 6l12 12"}
                        />
                    </svg>
                </button>

                {/* Right: Links */}
                <div
                    className={`absolute md:static top-16 font-bold right-0 w-full md:w-auto bg-teal-50 md:bg-transparent shadow-md md:shadow-none md:flex text-center text-xl items-center justify-center space-y-4 md:space-y-0 md:space-x-6 transition-all duration-300 ${isOpen ? "block mt-7" : "hidden"
                        }`}
                >
                    <a href="/" className="block md:inline text-teal-800 hover:text-teal-600 text">
                        Home
                    </a>
                    <a href="/Data" className="block md:inline text-teal-800 hover:text-teal-600 text">
                        Data
                    </a>
                    <a href="/AboutUs" className="block md:inline text-teal-800 hover:text-teal-600 text">
                        About Us
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
