import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../../Context/AppContext';
import { Link, useParams } from 'react-router-dom';

const SearchProduct = () => {
  const { product } = useContext(AppContext);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const { term } = useParams(); // Corrected typo here

  useEffect(() => {
    setRelatedProduct(
      product.filter((data) =>
        data.title.toLowerCase().includes(term.toLowerCase())
      )
    );
  }, [term, product]);

  return (
    <div className="bg-white text-black">
      <h1 className="text-center text-lg text-balance">Related Products</h1>
      <div
        className="flex flex-wrap gap-8 justify-center p-6"
        style={{ background: 'white' }}
      >
        {relatedProduct.map((item) => (
          <div
            key={item.id}
            className="flex flex-col bg-opacity-70 bg-gray-900 shadow-xl rounded-lg p-6 w-64 transform transition-transform hover:scale-105 duration-300 hover:shadow-2xl"
          >
            <Link
              to={`/product/${item._id}`}
              className="flex flex-col items-center mb-4 transition-transform duration-500 hover:rotate-2 hover:scale-105"
            >
              <img
                src={item.imgSrc}
                alt={item.title}
                className="w-32 h-32 object-cover rounded-md border-2 border-gray-700 shadow-lg transition-transform duration-300"
              />
            </Link>
            <h1 className="text-lg font-semibold text-gray-100 text-center mb-2">
              {item.title}
            </h1>
            <p className="text-gray-400 font-medium text-center mb-4">
              {item.price.toFixed(2)} nrp
            </p>
            <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg shadow-md transform hover:translate-y-1 transition duration-300 ease-in-out">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchProduct;
