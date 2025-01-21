import React from "react";
import { FaTint, FaShieldAlt, FaWater } from "react-icons/fa";
import { LuShield } from "react-icons/lu";
import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-blue-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap justify-between py-8">
                    {/* Logo and Description */}
                    <div className="w-full md:w-1/3">
                        <div className="items-center space-x-2">
                            {/* Placeholder for logo */}
                            <div className="flex items-center gap-3 space-y-2">
                                <div className="bg-blue-700 w-16 h-16 rounded-full flex items-center justify-center shadow-lg relative">
                                    <FaTint className="text-white w-5 h-5" />
                                    <LuShield className="text-white w-11 h-11 absolute" />
                                </div>
                                <div className="text-center">
                                    <h1 className="text-2xl font-bold text-blue-400">AquaGuard</h1>
                                    <p className="text-sm text-gray-400">Pani ka Doctor!!!!</p>
                                </div>
                            </div>
                        </div>
                        <p className="mt-2 text-gray-300">
                            Innovative water management solutions for sustainable living.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="w-full md:w-1/3 mt-4 md:mt-0">
                        <h3 className="text-lg font-semibold">Quick Links</h3>
                        <ul className="mt-2 space-y-2">
                            <li>
                                <a
                                    href="/docs"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    Documentation
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://github.com/your-repo"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    GitHub Repository
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/about"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/contact"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    Contact
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/blog"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/careers"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    Careers
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social Icons and Contact Info */}
                    <div className="w-full md:w-1/3 mt-4 md:mt-0">
                        <h3 className="text-lg font-semibold">Connect With Us</h3>
                        <div className="mt-4 flex space-x-4">
                            <a
                                href="https://github.com/your-repo"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-300 hover:text-white transition-colors"
                            >
                                <FaGithub className="w-6 h-6" />
                            </a>
                            <a
                                href="https://twitter.com/your-profile"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-300 hover:text-white transition-colors"
                            >
                                <FaTwitter className="w-6 h-6" />
                            </a>
                            <a
                                href="https://linkedin.com/in/your-profile"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-300 hover:text-white transition-colors"
                            >
                                <FaLinkedin className="w-6 h-6" />
                            </a>
                        </div>
                        <div className="mt-4 text-gray-300">
                            <p className="flex items-center space-x-2">
                                <FaEnvelope />
                                <span>support@aquaguard.com</span>
                            </p>
                            <p className="flex items-center space-x-2 mt-2">
                                <FaPhone />
                                <span>+1 (555) 123-4567</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 pt-4">
                    <p className="text-center text-gray-300 text-sm">
                        © {new Date().getFullYear()} AquaGuard. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
