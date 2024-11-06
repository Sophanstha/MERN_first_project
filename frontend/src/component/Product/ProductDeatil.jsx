import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import RelatedProduct from './RelatedProduct';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const url = "http://localhost:1000/api/v1/";

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

    return (
        <>
            <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-8 lg:px-16">
                {product ? (
                    <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden flex flex-col lg:flex-row">
                        {/* Product Image */}
                        <div className="lg:w-1/2 p-6 flex items-center justify-center">
                            <img
                                src={product.imgSrc} // Ensure this is the correct key from your API response
                                alt={product.title}
                                className="object-cover rounded-lg w-full max-w-md shadow-lg"
                            />
                        </div>

                        {/* Product Details */}
                        <div className="lg:w-1/2 p-8 flex flex-col justify-between">
                            <div>
                                <h1 className="text-3xl font-semibold text-gray-800 mb-4">{product.title}</h1>
                                <p className="text-gray-600 text-lg mb-6">{product.description}</p>
                            </div>

                            <div className="border-t pt-4 mt-4 flex flex-col gap-4">
                                {/* Price */}
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold text-gray-800">Price</span>
                                    <span className="text-2xl text-purple-500 font-semibold">{product.price} NRP</span>
                                </div>

                                {/* Buttons */}
                                <button className="mt-4 w-full bg-red-700 hover:bg-red-800 text-white text-lg font-semibold py-3 rounded-lg shadow-md transform transition-transform duration-200 hover:scale-105">
                                    Buy Now
                                </button>
                                <button className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white text-lg font-semibold py-3 rounded-lg shadow-md transform transition-transform duration-200 hover:scale-105">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-gray-500 text-xl">Loading product details...</p>
                )}
            </div>
            {/* Render RelatedProduct only if product is not null */}
            {product && <RelatedProduct category={product.category} />}
        </>
    );
};

export default ProductDetail;
