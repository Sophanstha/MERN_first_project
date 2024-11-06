import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import AppContext from '../Context/AppContext';

const UpdateProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { updateproduct } = useContext(AppContext);
    const url = "http://localhost:1000/api/v1/";

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        qty: "",
        category: "",
        imgSrc: "" // Stores the current image URL or file object
    });

    // Fetch Product Data
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const api = await axios.get(`${url}product/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                });
                setProduct(api.data.product);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchProduct();
    }, [id]);

    // Populate Form Data with Product
    useEffect(() => {
        if (product) {
            setFormData({
                title: product.title || "",
                description: product.description || "",
                price: product.price || "",
                qty: product.qty || "",
                category: product.category || "",
                imgSrc: product.imgSrc || ""
            });
        }
    }, [product]);

// Handle Form Change
const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
        ...prevData,
        [name]: type === "file" ? files[0] : value,
    }));
};

// Submit Updated Product
const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
    });

    console.log("FormData before submit:", formData); // Debug log

    try {
        const result = await updateproduct(data, id);
        console.log("Update result:", result);
    } catch (error) {
        console.error("Error updating product:", error);
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

            {/* Edit Product Form */}
            <form className="flex-1 p-6 bg-gray-900 bg-opacity-90 rounded-lg shadow-lg w-full space-y-6" onSubmit={handleSubmit}>
                <h2 className="text-3xl font-bold text-center text-white">Edit Product</h2>
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
                    <div className="flex items-center space-x-4">
                        {formData.imgSrc && typeof formData.imgSrc === "string" && (
                            <img
                                src={formData.imgSrc}
                                alt="Current Product"
                                className="h-24 w-24 rounded-lg object-cover"
                            />
                        )}
                        <input
                            type="file"
                            name="imgSrc"
                            onChange={handleChange}
                            className="w-full p-4 text-white bg-gray-800 border-b-2 border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full p-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
                >
                    Update Product
                </button>
            </form>
        </div>
    );
};

export default UpdateProduct;
