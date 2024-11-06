import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from './Component/Register';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Component/Login';
import Dashboard from './Component/Dashboard';
import Addproduct from './Component/Addproduct';
import CustomerInfo from './Component/CustomerInfo';
import UpdateProduct from './Component/UpdateProduct';
const App = () => {
    return (
        <>
         <Router>
         <ToastContainer/>

            <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={ <Login/>} />
            <Route path="/dashboard" element={ <Dashboard/>} />
            <Route path="/addproduct" element={ <Addproduct/>} />
            <Route path="/customerInfo" element={ <CustomerInfo/>} />
            {/* <Route path="/product" element={ <CustomerInfo/>} /> */}
            <Route path="/product/:id" element={<UpdateProduct />} />

         

            </Routes>
        </Router>
    

        </>
    );
};

export default App;
