import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";

const Billing = () => {
  const [products, setProducts] = useState([{ name: "", price: "", quantity: 1 }]);
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split("T")[0]);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [lastInvoiceNumber, setLastInvoiceNumber] = useState("");
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerNumber, setCustomerNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [gstNumber, setGstNumber] = useState("");
  const [taxPercent, setTaxPercent] = useState(18);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  // Fetch last invoice number from backend on component mount
  useEffect(() => {
    const fetchLastInvoiceNumber = async () => {
      try {
        const response = await fetch("https://lapuniverse.com:5000/api/invoices/last");
        if (response.ok) {
          const data = await response.json();
          setLastInvoiceNumber(data.lastInvoiceNumber || "0000");
          setInvoiceNumber((parseInt(data.lastInvoiceNumber || "0000", 10) + 1).toString().padStart(4, "0"));
        } else {
          console.error("Failed to fetch last invoice number");
        }
      } catch (error) {
        console.error("Error fetching last invoice number:", error);
      }
    };

    fetchLastInvoiceNumber();
  }, []);

  // Calculate totals whenever products or taxPercent change
  useEffect(() => {
    const newSubtotal = products.reduce(
      (total, product) =>
        total + (parseFloat(product.price || 0) * parseInt(product.quantity || 1)),
      0
    );
    const newTax = (newSubtotal * taxPercent) / 100;
    const newTotal = newSubtotal + newTax;

    setSubtotal(newSubtotal);
    setTax(newTax);
    setTotal(newTotal);
  }, [products, taxPercent]);

  // Handle product changes
  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

  // Add new product row
  const addProduct = () => {
    setProducts([...products, { name: "", price: "", quantity: 1 }]);
  };

  // Remove product row
  const removeProduct = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  // Handle invoice submission
  const submitInvoice = async () => {
    // Check if customer name, email, or number is empty
    if (!customerName || !customerNumber || !customerEmail) {
      alert("Customer name, email, and phone number are required!");
      return;
    }

    const invoiceData = {
      invoiceDate,
      invoiceNumber,
      customerName,
      customerEmail,
      customerNumber,
      gstNumber,
      taxPercent,
      products,
      subtotal,
      tax,
      total,
    };

    try {
      const response = await fetch("https://lapuniverse.com:5000/api/invoices/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(invoiceData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Invoice saved successfully!");
        console.log(data);
      } else {
        alert(data.message || "Failed to save the invoice!");
      }
    } catch (error) {
      console.error("Error saving invoice:", error);
      alert("Something went wrong!");
    }
  };

  // Print invoice
  const printInvoice = async () => {
    await submitInvoice();
    window.print();
  };

  // Download invoice as PDF
  const downloadInvoice = () => {
    const doc = new jsPDF();
    doc.text(`Invoice Date: ${invoiceDate}`, 10, 10);
    doc.text(`Invoice Number: ${invoiceNumber}`, 10, 20);
    doc.text(`Customer Name: ${customerName}`, 10, 30);
    doc.text(`Customer Number: ${customerName}`, 10, 40);
    doc.text(`Customer Email: ${customerName}`, 10, 50);
    doc.text(`GST Number: ${gstNumber}`, 10, 60);
    doc.text(`Tax Percentage: ${taxPercent}%`, 10, 70);
    doc.text(`Subtotal: ₹${subtotal.toFixed(2)}`, 10, 80);
    doc.text(`Tax: ₹${tax.toFixed(2)}`, 10, 90);
    doc.text(`Total: ₹${total.toFixed(2)}`, 10, 100);

    let yOffset = 100;
    doc.text("Products:", 10, yOffset);
    products.forEach((product) => {
      yOffset += 10;
      doc.text(`${product.name} - ₹${product.price} x ${product.quantity}`, 10, yOffset);
    });

    doc.save(`Invoice_${invoiceNumber}.pdf`);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Billing</h2>
      <div className="space-y-4">
        <div>
          <label className="block font-semibold">Invoice Date</label>
          <input
            type="date"
            value={invoiceDate}
            onChange={(e) => setInvoiceDate(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-semibold">
            Invoice Number 
            <span className="text-red-500"> (Last: {lastInvoiceNumber})</span>
          </label>
          <input
            type="text"
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
            className="w-full border rounded p-2"
            placeholder={`Next: ${(parseInt(lastInvoiceNumber || "0000", 10) + 1).toString().padStart(4, "0")}`}
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Customer Name</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Enter Customer Name"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Customer Mobile Number</label>
          <input
            type="number"
            value={customerNumber}
            onChange={(e) => setCustomerNumber(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Enter Customer Mobile Number"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Customer Email Id</label>
          <input
            type="email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Enter Customer Email Id"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">GST Number</label>
          <input
            type="text"
            value={gstNumber}
            onChange={(e) => setGstNumber(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Enter GST Number"
          />
        </div>
        <div>
          <label className="block font-semibold">Tax Percentage (%)</label>
          <input
            type="number"
            value={taxPercent}
            onChange={(e) => setTaxPercent(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div className="mt-4">
          <h3 className="font-bold mb-2">Products</h3>
          {products.map((product, index) => (
            <div key={index} className="flex items-center space-x-4 mb-2">
              <input
                type="text"
                placeholder="Product Name"
                value={product.name}
                onChange={(e) => handleProductChange(index, "name", e.target.value)}
                className="flex-1 border rounded p-2"
              />
              <input
                type="number"
                placeholder="Price"
                value={product.price}
                onChange={(e) => handleProductChange(index, "price", e.target.value)}
                className="w-32 border rounded p-2"
              />
              <input
                type="number"
                placeholder="Quantity"
                value={product.quantity}
                onChange={(e) => handleProductChange(index, "quantity", e.target.value)}
                className="w-32 border rounded p-2"
              />
              <button onClick={() => removeProduct(index)} className="text-red-500">Remove</button>
            </div>
          ))}
          <button onClick={addProduct} className="text-blue-500">Add Product</button>
        </div>

        <div className="mt-4">
          <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
          <p>Tax ({taxPercent}%): ₹{tax.toFixed(2)}</p>
          <p>Total: ₹{total.toFixed(2)}</p>
        </div>
        <div className="mt-4 flex space-x-4">
          <button onClick={printInvoice} className="bg-blue-500 text-white p-2 rounded">Print Invoice</button>
          <button onClick={downloadInvoice} className="bg-green-500 text-white p-2 rounded">Download PDF</button>
          <button onClick={submitInvoice} className="bg-yellow-500 text-white p-2 rounded">Save Invoice</button>
        </div>
      </div>
    </div>
  );
};

export default Billing;
