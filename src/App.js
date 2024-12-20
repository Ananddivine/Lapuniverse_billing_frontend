import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import Billing from "./pages/Billing";
import Customers from "./pages/Customers";
import Invoices from "./pages/Invoices";

const App = () => {
  return (
    <Router>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />
        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Navbar */}
          <Navbar />
          {/* Page Content */}
          <div className="flex-1 p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/billing" element={<Billing />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/invoices" element={<Invoices />} />
            </Routes>
          </div>
          {/* Footer at Bottom */}
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;
