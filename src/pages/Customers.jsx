import React, { useEffect, useState } from "react";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const API_URL = "https://lapuniversebillingbackend-production.up.railway.app/api";  // Ensure API URL is correct

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(`${API_URL}/invoices/all`); // Fetching from invoices endpoint
        const data = await response.json();
        setCustomers(data);  // Assuming this returns invoices with customer data
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Customers</h2>
      <table className="w-full mt-4 border">
        <thead>
          <tr className="bg-gray-300">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Contact</th>
            <th className="p-2">Invoice Number</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((invoice, index) => (
            <tr key={index} className="border-t">
              <td className="p-2">{invoice.customerName}</td> {/* Access customer data */}
              <td className="p-2">{invoice.customerEmail}</td>
              <td className="p-2">{invoice.customerNumber}</td>
              <td className="p-2">{invoice.invoiceNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customers;
