import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const links = [
    { name: "Dashboard", path: "/" },
    { name: "Billing", path: "/billing" },
    { name: "Customers", path: "/customers" },
    { name: "Invoices", path: "/Invoices" },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white h-screen p-4">
      <ul>
        {links.map((link) => (
          <li key={link.name} className="mb-4">
            <Link
              to={link.path}
              className="block hover:bg-gray-700 p-2 rounded w-full"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;

