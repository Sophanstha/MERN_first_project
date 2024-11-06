import React from 'react';
import AppContext from '../Context/AppContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
const Dashboard = () => {
const {product,deletepdt} = useContext(AppContext)
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
      {/* <main className="flex-1 p-6"> */}
        {/* Dashboard Sections */}
        <section id="productDetails" className="mb-8">
      <h3 className="text-2xl font-bold mb-4">Product Details</h3>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-3 px-5 bg-gray-200 text-gray-600 font-bold uppercase text-sm text-left">Image</th>
              <th className="py-3 px-5 bg-gray-200 text-gray-600 font-bold uppercase text-sm text-left">Title</th>
              <th className="py-3 px-5 bg-gray-200 text-gray-600 font-bold uppercase text-sm text-left">Category</th>
              <th className="py-3 px-5 bg-gray-200 text-gray-600 font-bold uppercase text-sm text-left">Price</th>
              <th className="py-3 px-5 bg-gray-200 text-gray-600 font-bold uppercase text-sm text-left">Description</th>
              <th className="py-3 px-5 bg-gray-200 text-gray-600 font-bold uppercase text-sm text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {product.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-5">
                  <img
                    src={product.imgSrc}
                    alt={product.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="py-3 px-5">{product.title}</td>
                <td className="py-3 px-5">{product.category}</td>
                <td className="py-3 px-5">${product.price}</td>
                <td className="py-3 px-5">{product.description}</td>
                <td className="py-3 px-5 space-x-2">
                   <Link to={`/product/${product._id}`}
                    // onClick={() => onEdit(product.id)}
                    className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={()=>deletepdt(product._id)}
                    className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>

      
    </div>
  );
};

export default Dashboard;
