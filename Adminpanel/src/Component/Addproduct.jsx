import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AppContext from "../Context/AppContext";
import { toast } from 'react-toastify'; // Make sure to import toast if you are using it

const AddProduct = () => {
  const { addproduct } = useContext(AppContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    qty: "",
    category: "",
    imgSrc: ""
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] }); // Store the file object directly
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]); // Append each field
    });

    const result = await addproduct(data); // Pass the FormData object
    console.log("result", result);

    if (result) {
        // Optionally, you can handle the success case
        setFormData({
            title: "",
            description: "",
            price: "",
            qty: "",
            category: "",
            imgSrc: "", // Reset to initial state
        });
    }
};

  return (
    <div className="flex bg-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-700 text-white flex flex-col p-4 space-y-6 h-screen sticky top-0">
    <h2 className="text-2xl font-semibold text-center mb-4">Admin Dashboard</h2>
    <nav className="space-y-4">
      <Link to="/dashboard" className="block py-2 px-4 rounded hover:bg-indigo-600">
        Product Details
      </Link>
      <Link to="/addproduct" className="block py-2 px-4 rounded hover:bg-indigo-600">
        Add Product
      </Link>
      <Link to="/orderInfo" className="block py-2 px-4 rounded hover:bg-indigo-600">
        Order Information
      </Link>
      <Link to="/customerInfo" className="block py-2 px-4 rounded hover:bg-indigo-600">
        Customer Information
      </Link>
    </nav>
  </aside>

      {/* Add Product Form */}
      <form
        className="flex-1 p-6  bg-gray-900 bg-opacity-90 rounded-lg shadow-lg  w-full space-y-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold text-center text-white">Add New Product</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Product Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-4 text-white bg-gray-800 border-b-2 border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <textarea
            name="description"
            placeholder="Product Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-4 text-white bg-gray-800 border-b-2 border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-4 text-white bg-gray-800 border-b-2 border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="number"
            name="qty"
            placeholder="Quantity"
            value={formData.qty}
            onChange={handleChange}
            className="w-full p-4 text-white bg-gray-800 border-b-2 border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-4 text-white bg-gray-800 border-b-2 border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="file"
            name="imgSrc"
            onChange={handleChange}
            className="w-full p-4 text-white bg-gray-800 border-b-2 border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
