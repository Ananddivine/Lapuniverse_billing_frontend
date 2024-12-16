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
    const pdfUrl = `https://lapuniversebillingbackend-production.up.railway.ap/uploads/${invoicePdf}`;  // Use relative path from DB
    const printWindow = window.open(pdfUrl, "_blank");
    printWindow.print();
  };
  
  const downloadInvoice = (invoicePdf, invoiceNumber) => {
    const pdfUrl = `https://lapuniversebillingbackend-production.up.railway.ap/uploads/${invoicePdf}`;  // Use relative path from DB
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `Invoice_${invoiceNumber}.pdf`; // Set filename for download
    link.click();
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
              className="bg-green-500 text-white p-2 rounded"
            >
              Download Invoice
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Invoices;
