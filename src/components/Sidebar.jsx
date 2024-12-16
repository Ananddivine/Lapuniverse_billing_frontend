import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaFileInvoice, FaUser, FaMoneyBill, FaBars, FaTimes } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // Sidebar open state
  const [isPinned, setIsPinned] = useState(false); // To toggle manual pin state

  // Navigation links with icons
  const links = [
    { name: "Dashboard", path: "/", icon: <FaTachometerAlt /> },
    { name: "Billing", path: "/billing", icon: <FaMoneyBill /> },
    { name: "Customers", path: "/customers", icon: <FaUser /> },
    { name: "Invoices", path: "/invoices", icon: <FaFileInvoice /> },
  ];

  // Handle sidebar hover
  const handleMouseEnter = () => {
    if (!isPinned) setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (!isPinned) setIsOpen(false);
  };

  // Toggle manual pin/unpin sidebar
  const toggleSidebar = () => {
    setIsPinned(!isPinned);
    setIsOpen(!isPinned);
  };

  return (
    <aside
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${
        isOpen ? "w-64" : "w-16"
      } bg-gray-800 text-white  p-4 transition-all duration-300 relative`}
    >
      {/* Toggle button */}
      <button
        onClick={toggleSidebar}
        className="absolute top-4 right-4 text-white focus:outline-none"
      >
        {isPinned ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Navigation Links */}
      <ul className="mt-10">
        {links.map((link) => (
          <li key={link.name} className="mb-4">
            <Link
              to={link.path}
              className="flex items-center space-x-4 p-2 hover:bg-gray-700 rounded"
            >
              {/* Icon */}
              <span className="text-lg">{link.icon}</span>
              {/* Text (show only when open) */}
              {isOpen && (
                <span className="text-white">{link.name}</span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
