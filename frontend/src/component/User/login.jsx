import React, { useContext, useState } from 'react';
import AppState from '../../Context/AppState';
import AppContext from '../../Context/AppContext';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const {login} = useContext(AppContext)
 const Navigate = useNavigate()
  const [formData, setFormData] = useState({
    email : "email",
    password : "",
  });

  const handleChange = (e) => {
    const {name,value} = e.target
    setFormData({...formData , [name]:value})
  };
    const {email,password} = formData
  const handleSubmit = async(e) => {
    e.preventDefault();
    // handle form submission logic here
      // alert("yoour form is submit")
      // console.log(api.data.message);
      
  const result = await login(email,password)
    
      if(result.success){
        Navigate("/")
      }
      
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#1b1c1d] via-[#2e2a52] to-[#a37943]">
      <form 
        className="bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-lg shadow-lg max-w-md w-full space-y-6 animate-fade-in transform transition duration-700 hover:scale-105"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold text-center text-white">Login</h2>
        <div className="space-y-4">
         
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
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
