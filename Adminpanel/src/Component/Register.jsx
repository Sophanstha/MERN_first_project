import React, { useContext, useState } from 'react';
import AppContext from '../Context/AppContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { register } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { username, email, password } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("formData", formData);

    const result = await register(username, email, password);
    if (result && result.success) {
      navigate("/login");
    }
    console.log("result", result);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#1b1c1d] via-[#2e2a52] to-[#a37943]">
      <form 
        className="bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-lg shadow-lg max-w-md w-full space-y-6 animate-fade-in transform transition duration-700 hover:scale-105"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold text-center text-white">Register As Admin</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-4 text-white bg-transparent border-b-2 border-white placeholder-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 text-white bg-transparent border-b-2 border-white placeholder-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-4 text-white bg-transparent border-b-2 border-white placeholder-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <button 
          type="submit"
          className="w-full p-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
        >
          Register
        </button>
        <h4 className="text-white mt-4 text-center">
        Already have an account?{" "}
        <span onClick={() => navigate("/login")} className="text-indigo-500 cursor-pointer underline">
          Login
        </span>
      </h4>
      </form>
     
    </div>
  );
};

export default Register;
