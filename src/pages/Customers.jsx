import React from "react";

const Customers = () => {
  const customers = [
    { name: "John Doe", email: "john@example.com" },
    { name: "Jane Smith", email: "jane@example.com" },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Customers</h2>
      <table className="w-full mt-4 border">
        <thead>
          <tr className="bg-gray-300">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={index} className="border-t">
              <td className="p-2">{customer.name}</td>
              <td className="p-2">{customer.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customers;
