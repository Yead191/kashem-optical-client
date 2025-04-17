import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiSend,
  FiGithub,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiArrowUp,
  FiHelpCircle,
  FiInfo,
  FiMessageSquare,
  FiFileText,
  FiSettings,
  FiShield,
  FiBookmark,
  FiChevronRight,
  FiMail,
  FiMapPin,
  FiPhone,
  FiGlobe,
} from "react-icons/fi";
import { IoLogoYoutube } from "react-icons/io5";
import { GiSunglasses } from "react-icons/gi";
import { ShoppingBag } from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  // Check scroll position to show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      // console.log("Subscribed with email:", email);
      setIsSubscribed(true);
      setEmail("");

      setTimeout(() => {
        setIsSubscribed(false);
      }, 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  // Footer links
  const footerLinks = [
    {
      id: "company",
      title: "Quick Links",
      links: [
        { name: "About Us", path: "/about", icon: <FiInfo size={16} /> },
        
        {
          name: "Contact Us",
          path: "/contact-us",
          icon: <FiMessageSquare size={16} />,
        },
        {
          name: "Shop",
          path: "/products",
          icon: <GiSunglasses size={16} />,
        },
        {
          name: "Cart",
          path: "/dashboard/manage-cart",
          icon: <ShoppingBag size={16} />,
        },
      ],
    },
    {
      id: "legal",
      title: "Legal",
      links: [
        {
          name: "Terms and Conditions",
          path: "/terms-and-conditions",
          icon: <FiFileText size={16} />,
        },
        {
          name: "Cookie Settings",
          path: "/cookie-settings",
          icon: <FiSettings size={16} />,
        },
        {
          name: "Privacy Policy",
          path: "/privacy-policy",
          icon: <FiShield size={16} />,
        },
        { name: "Imprint", path: "/imprint", icon: <FiBookmark size={16} /> },
      ],
    },
  ];

  /*const socialLinks = [
        { icon: <FiTwitter size={20} />, path: "https://twitter.com", label: "Twitter", color: "text-blue-400" },
        { icon: <FiInstagram size={20} />, path: "https://instagram.com", label: "Instagram", color: "text-pink-500" },
        { icon: <FiLinkedin size={20} />, path: "https://linkedin.com", label: "LinkedIn", color: "text-blue-600" },
        { icon: <FiGithub size={20} />, path: "https://github.com", label: "GitHub", color: "text-gray-700 dark:text-gray-300" },
        { icon: <IoLogoYoutube size={20} />, path: "https://youtube.com", label: "YouTube", color: "text-red-600" }
    ];*/

  return (
    <footer
      className={`w-full transition-all duration-300 relative overflow-hidden bg-gradient-to-b from-white to-gray-50 text-gray-800 border-t`}
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute -top-24 -right-24 w-48 h-48 rounded-full opacity-10 bg-indigo-600 `}
        ></div>
        <div
          className={`absolute top-1/2 -left-24 w-64 h-64 rounded-full opacity-10 bg-blue-400 `}
        ></div>
        <div
          className={`absolute -bottom-32 right-1/4 w-80 h-80 rounded-full opacity-10 bg-cyan-400 `}
        ></div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 pt-20 pb-5 relative z-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-5">
          {/* Logo and Info Section */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" onClick={scrollToTop} className="inline-block group">
              <span
                className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 transform group-hover:scale-105`}
              >
                Kashem Optical
              </span>
            </Link>

            <p className={`max-w-md text-gray-600`}>
              Your trusted destination for premium eyewear since 2015. Discover
              the latest collections, from classic eyeglasses to screen glasses,
              tailored to your style and vision needs. See the world clearly with Kashem Optical!
            </p>

            {/*<div className="pt-4">
                            <h4 className={`text-sm font-semibold uppercase tracking-wider mb-4 ${
                                darkMode ? "text-gray-300" : "text-gray-700"
                            }`}>
                                Connect With Us
                            </h4>
                            <div className="flex flex-wrap gap-3">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.path}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
                                            darkMode
                                                ? "bg-gray-800 hover:bg-gray-700"
                                                : "bg-white hover:bg-gray-100 shadow-sm"
                                        }`}
                                        aria-label={social.label}
                                    >
                                        <span className={social.color}>{social.icon}</span>
                                    </a>
                                ))}
                            </div>
                        </div>*/}
          </div>

          {/* Quick Links Section */}
          <div className="lg:col-span-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {footerLinks.map((section) => (
                <div key={section.id} className="space-y-4">
                  {/* Mobile Accordion Header */}
                  <div
                    className="flex justify-between items-center lg:hidden cursor-pointer"
                    onClick={() => toggleSection(section.id)}
                  >
                    <h3 className={`text-lg font-bold text-gray-900 `}>
                      {section.title}
                    </h3>
                    <FiChevronRight
                      className={`transition-transform duration-300 ${
                        activeSection === section.id ? "rotate-90" : ""
                      }`}
                    />
                  </div>

                  {/* Desktop Header */}
                  <h3
                    className={`text-lg font-bold hidden lg:block text-gray-900 `}
                  >
                    {section.title}
                  </h3>

                  {/* Links */}
                  <ul
                    className={`space-y-3 ${
                      activeSection === section.id || window.innerWidth >= 1024
                        ? "block"
                        : "hidden lg:block"
                    }`}
                  >
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          to={link.path}
                          className={`group flex items-center text-sm transition-all duration-200 text-gray-600 hover:text-indigo-600 `}
                        >
                          <span
                            className={`mr-2 transition-colors text-indigo-500 group-hover:text-indigo-600 `}
                          >
                            {link.icon}
                          </span>
                          <span className="group-hover:translate-x-1 transition-transform">
                            {link.name}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="lg:col-span-4 space-y-6">
            <div
              className={`p-6 rounded-xl backdrop-blur-md bg-white border border-gray-100 shadow-md `}
            >
              <h3 className={`text-xl font-bold mb-4 text-gray-900 `}>
                Stay Updated
              </h3>
              <p className={`mb-4 text-sm text-gray-600 `}>
                Subscribe to our newsletter for the latest gadgets, special
                offers, and tech news.
              </p>

              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email"
                    className={`w-full px-4 py-3 rounded-lg focus:outline-none transition-all duration-300 bg-gray-50 text-gray-900 border border-gray-200 focus:border-indigo-400 `}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-all duration-300 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white `}
                >
                  Subscribe <FiSend className="ml-2" />
                </button>

                {isSubscribed && (
                  <p className={`text-center animate-pulse text-green-600 `}>
                    Thanks for subscribing!
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className={`h-px w-full bg-gray-200 `}></div>

        {/* Bottom Section */}
        <div className="pt-5 flex flex-col md:flex-row justify-between items-center">
          <p className={`text-sm text-gray-500 `}>
            &copy; {new Date().getFullYear()} KashemOptical. All rights
            reserved.
          </p>
          {showScrollButton && (
            <button
              onClick={scrollToTop}
              className={`mt-4 md:mt-0 p-3 rounded-full transition-all duration-300 transform hover:scale-110 bg-white text-indigo-600 hover:bg-gray-100 shadow-sm `}
              aria-label="Scroll to top"
            >
              <FiArrowUp size={20} className="animate-bounce" />
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
