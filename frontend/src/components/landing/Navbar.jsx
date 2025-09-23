// components/Navbar.jsx
import React, { useEffect, useState } from "react";

const sections = ["home", "about", "program", "contact"];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          const offsetTop = section.offsetTop;
          const offsetHeight = section.offsetHeight;

          if (scrollY >= offsetTop - 100 && scrollY < offsetTop + offsetHeight - 100) {
            setActiveSection(id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // trigger on load
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Tutup menu saat klik link (mobile)
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow z-50">
      <div className="container mx-auto px-6 flex justify-between items-center py-4">
        {/* Logo */}
        <div className="text-amber-600 font-bold text-xl md:text-3xl cursor-pointer select-none">
          GSosial
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 bg-gray-200 p-2 rounded">
          {sections.map((section) => (
            <li key={section}>
              <a
                href={`#${section}`}
                onClick={handleLinkClick}
                className={`capitalize text-sm font-medium transition-all duration-300 ease-in-out inline-block px-3 py-1 rounded-md ${
                  activeSection === section
                    ? "bg-amber-600 text-white transform scale-105 shadow-md"
                    : "text-gray-600 hover:text-amber-500 hover:bg-white"
                }`}
              >
                {section}
              </a>
            </li>
          ))}
        </ul>

        {/* Tombol Bergabung (desktop) */}
        <a
          href="login"
          className="hidden md:inline-block bg-amber-600 text-white px-5 py-2 rounded-md font-semibold hover:bg-amber-700 transition-colors duration-200"
        >
          Bergabung
        </a>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            // Icon close (X)
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            // Icon hamburger
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col space-y-2 px-6 py-4 bg-gray-200 ">
            {sections.map((section) => (
              <li key={section}>
                <a
                  href={`#${section}`}
                  onClick={handleLinkClick}
                  className={`capitalize block text-base font-medium rounded-md px-3 py-2 transition-all duration-300 ease-in-out ${
                    activeSection === section
                      ? "bg-amber-600 text-white shadow-md"
                      : "text-gray-700 hover:text-amber-600 hover:bg-white"
                  }`}
                >
                  {section}
                </a>
              </li>
            ))}
            <li>
              <a
                href="login"
                onClick={handleLinkClick}
                className="block bg-amber-600 text-white text-center rounded-md px-3 py-2 font-semibold hover:bg-amber-700 transition-colors duration-200"
              >
                Bergabung
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
