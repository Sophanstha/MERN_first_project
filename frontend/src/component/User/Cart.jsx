import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../../Context/AppContext';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cart,decreaseqty,addtocart,removecart } = useContext(AppContext);
    const [qty, setQty] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        let totalQty = 0;
        let totalPrice = 0;

        if (cart?.items) {
            for (let index = 0; index < cart.items.length; index++) {
                totalQty += cart.items[index].qty;
                totalPrice += cart.items[index].price * cart.items[index].qty; // Calculate total price for each item
            }
        }
        setTotalPrice(totalPrice);
        setQty(totalQty);
    }, [cart]);

    return (
        <div 
            className="container mx-auto p-6" 
            style={{ 
                background: 'linear-gradient(135deg, #1b1c1d, #2e2a52, #49386a, #614387, #a37943)',
                borderRadius: '0.5rem',
            }}
        >
            <h1 className="text-3xl font-bold mb-6 text-center text-white">Your Shopping Cart</h1>

            <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg mb-6">
                <div className="flex justify-between">
                    <span className="text-xl font-semibold">Total Quantity:</span>
                    <span className="text-xl font-semibold">{qty}</span>
                </div>
                <div className="flex justify-between mt-2">
                    <span className="text-xl font-semibold">Total Price:</span>
                    <span className="text-xl font-semibold">NRP {totalPrice.toFixed(2)}</span>
                </div>
            </div>

            {cart?.items && cart.items.length > 0 ? (
                <div className="flex flex-col space-y-4">
                    {cart.items.map((item) => (
                        <div key={item.productId} className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between">
                            <img
                                src={item.imgSrc}
                                alt={item.title}
                                className="w-24 h-24 object-cover rounded-lg mr-4"
                            />
                            <div className="flex-1 flex flex-col">
                                <h2 className="text-lg font-semibold">{item.title}</h2>
                                {/* <p className="text-gray-600">Category: {item.}</p> */}
                                <p className="text-gray-800">Price: NRP {item.price.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center">
                                <button
                                    // onClick={() => handleDecrease(item.productId)} 
                                    className="bg-gray-300 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-400 transition duration-200"
                                onClick={()=>decreaseqty(item.productid,1)}
                                >
                                    -
                                </button>
                                <span className="mx-2 text-lg">{item.qty}</span>
                                <button
                                    // onClick={() => handleIncrease(item.productId)} 
                                    className="bg-gray-300 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-400 transition duration-200"
                                    onClick={()=>{
                                        addtocart(
                                            // product._id, product.title, product.price, 1, product.imgSrc
                                            item.productid,item.title,item.price / item.qty,1,item.imgSrc
                                        )
                                    }}
                  >
                                    +
                                </button>
                            </div>
                            <button
                            onClick={()=>removecart(item.productid)}
                             className="ml-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200">
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center">
                    <p className="text-lg text-gray-600">Your cart is empty.</p>
                </div>
            )}

            {cart?.items && cart.items.length > 0 && (
                <div className="mt-6 text-right">
                    <Link to={"/checkout"} className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition duration-200">
                        check out
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Cart;
