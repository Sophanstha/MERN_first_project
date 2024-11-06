import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Register from "./register";
import AppContext from "../../Context/AppContext";
import { useContext } from "react";
const Nav = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { logout, isAuth,cart } = useContext(AppContext);

  const onSubmit = (e) => {
    e.preventDefault();
    navigate(`/product/search/${searchTerm}`);
    setSearchTerm(""); // Reset the search term
  };

  return (
    <nav
      className="flex justify-between items-center p-4 shadow-md sticky top-0 z-10"
      style={{
        background:
          "linear-gradient(135deg, #1b1c1d, #2e2a52, #49386a, #614387, #a37943)",
      }}
    >
      {/* First Part */}
      <div className="flex items-center gap-15">
        <h1>Logo</h1>
        {/* Search Bar with Icon */}
        <div className="relative">
          <form onSubmit={onSubmit}>
            <input
              value={searchTerm}
              type="text"
              placeholder="Search..."
              className="px-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
          </form>
        </div>
        {isAuth && (
          <>
            <Link to={"/profile"}
              className="px-4 py-2"
              style={{
                backgroundColor: "blue",
                color: "white",
                borderRadius: "8px",
              }}
            >
              Profile
            </Link>
            <Link to={"/cart"}
              className="px-4 py-2 relative"
              style={{
                backgroundColor: "#49386a",
                color: "white",
                borderRadius: "8px",
              }}
            >
              <i className="fa-solid fa-cart-shopping"></i>
              {cart?.items?.length > 0 && (
    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
        {cart?.items?.length}
    </span>
)}

            </Link>
            <button
              className="px-4 py-2"
              style={{
                backgroundColor: "#dc3545",
                color: "white",
                borderRadius: "8px",
              }}
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              Logout
            </button>
          </>
        )}
        {!isAuth && (
          <>
            {/* Buttons with matching colors */}
            <Link
              to={"/login"}
              className="px-4 py-2"
              style={{
                backgroundColor: "#1b1c1d",
                color: "white",
                borderRadius: "8px",
              }}
            >
              Login
            </Link>
            <Link
              to={"/register"}
              className="px-4 py-2"
              style={{
                backgroundColor: "#2e2a52",
                color: "white",
                borderRadius: "8px",
              }}
            >
              Register
            </Link>
          </>
        )}
      </div>

      {/* Second Part */}
      <div></div>
    </nav>
  );
};

export default Nav;
