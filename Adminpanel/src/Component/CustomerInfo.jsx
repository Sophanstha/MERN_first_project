import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import AppContext from '../Context/AppContext';

const CustomerInfo = () => {
    const { loginUser } = useContext(AppContext);

    return (
        <div className="flex min-h-screen bg-gray-100">
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

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <h1 className="text-3xl font-semibold mb-6">Customer Information</h1>
                
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="py-2 px-4 border-b text-left text-gray-600 font-semibold">User Name</th>
                                <th className="py-2 px-4 border-b text-left text-gray-600 font-semibold">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loginUser && loginUser.map((user, index) => (
                                <tr key={user._id} className="hover:bg-gray-50">
                                    <td className="py-2 px-4 border-b">{user.username}</td>
                                    <td className="py-2 px-4 border-b">{user.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

export default CustomerInfo;
