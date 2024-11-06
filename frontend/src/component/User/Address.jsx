import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../../Context/AppContext';
import axios from 'axios';

const Address = () => {
    const { cart,userAddress } = useContext(AppContext);
    // const [address, setAddress] = useState(null);



    const handlePlaceOrder = () => {
        console.log('Order placed with details:', { cart, userAddress });
    };

    return (
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-center">Order Checkout</h1>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Order Summary */}
                <div className="md:w-1/2 bg-gray-100 p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
                    {cart?.items && cart.items.length > 0 ? (
                        <div className="space-y-4">
                            {cart.items.map((item) => (
                                <div key={item.productId} className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <img
                                            src={item.imgSrc}
                                            alt={item.title}
                                            className="w-16 h-16 object-cover rounded mr-4"
                                        />
                                        <div>
                                            <h3 className="text-lg font-medium">{item.title}</h3>
                                            <p className="text-sm text-gray-600">Qty: {item.qty}</p>
                                            <p className="text-sm text-gray-800">Price: NRP {(item.price * item.qty).toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="text-lg font-semibold mt-4 text-right">
                                Total: NRP {cart.items.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2)}
                            </div>
                        </div>
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
                </div>

                {/* Address Information */}
                <div className="md:w-1/2 bg-gray-100 p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Shipping Address</h2>
                    {userAddress ? (
                        <div className="text-lg space-y-2">
                            <p><strong>Name:</strong> {userAddress.fullname}</p>
                            {/* <p><strong>Email:</strong> {userAddress.email}</p> */}
                            <p><strong>Phone:</strong> {userAddress.phone}</p>
                            <p><strong>Statet:</strong> {userAddress.state}</p>
                            <p><strong>City:</strong> {userAddress.city}</p>
                            <p><strong>pincode:</strong> {userAddress.pincode}</p>
                            <p><strong>Country:</strong> {userAddress.country}</p>
                            <p><strong>Address:</strong> {userAddress.address}</p>
                        </div>
                    ) : (
                        <p>Loading address...</p>
                    )}
                </div>
            </div>

            {/* Place Order Button */}
            <div className="mt-6 text-center">
                <button
                    onClick={handlePlaceOrder}
                    className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-200"
                >
                    Place Order
                </button>
            </div>
        </div>
    );
};

export default Address;
