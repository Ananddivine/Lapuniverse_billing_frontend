import React from "react";

const Dashboard = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="bg-green-500 text-white p-4 rounded shadow">
          Total Sales
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded shadow">
          Pending Invoices
        </div>
        <div className="bg-red-500 text-white p-4 rounded shadow">
          Overdue Payments
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
