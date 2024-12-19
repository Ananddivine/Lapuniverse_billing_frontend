import React, { useEffect, useState } from "react";
import API_URL from "../config";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch(`${API_URL}/invoices/all`);
        const data = await response.json();
        setInvoices(data);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    fetchInvoices();
  }, []);

  // Print the invoice
  const printInvoice = (invoicePdf) => {
    const pdfUrl = `https://lapuniverse.com:5000/uploads/${invoicePdf}`;  // Use relative path from DB
    const printWindow = window.open(pdfUrl, "_blank");
    printWindow.print();
  };
  
  // Download the invoice
  const downloadInvoice = (invoicePdf, invoiceNumber) => {
    const pdfUrl = `https://lapuniverse.com:5000/uploads/${invoicePdf}`;  // Use relative path from DB
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `Invoice_${invoiceNumber}.pdf`; // Set filename for download
    link.click();
  };

  // Delete the invoice
  const deleteInvoice = async (invoiceId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this invoice?");
    if (confirmDelete) {
      try {
        const response = await fetch(`${API_URL}/invoices/delete/${invoiceId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setInvoices(invoices.filter((invoice) => invoice._id !== invoiceId));
          alert("Invoice deleted successfully");
        } else {
          const data = await response.json();
          alert(data.message || "Failed to delete the invoice");
        }
      } catch (error) {
        console.error("Error deleting invoice:", error);
        alert("Something went wrong!");
      }
    }
  };

  return (
    <div>
      <h1>Invoices</h1>
      <ul>
        {invoices.map((invoice) => (
          <li key={invoice._id}>
            <div>Invoice No: {invoice.invoiceNumber} - Total: ₹{invoice.total}</div>
            <button
              onClick={() => printInvoice(invoice.invoicePdf)}
              className="bg-blue-500 text-white p-2 rounded mr-2"
            >
              Print Invoice
            </button>
            <button
              onClick={() => downloadInvoice(invoice.invoicePdf, invoice.invoiceNumber)}
              className="bg-green-500 text-white p-2 rounded mr-2"
            >
              Download Invoice
            </button>
            <button
              onClick={() => deleteInvoice(invoice._id)}
              className="bg-red-500 text-white p-2 rounded"
            >
              Delete Invoice
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Invoices;
