import React from 'react';
// import ProductDetail from './component/Product/ProductDetail';
import ProductDetail from './component/Product/ProductDeatil';
import ShowProduct from './component/Product/ShowProduct';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchProduct from './component/Product/SearchProduct';
import Nav from './component/User/Nav';
import Register from './component/User/register';
import Profile from './component/User/Profile';
import Login from './component/User/login';
import Cart from './component/User/Cart';
import CheckOut from './component/User/CheckOut';
// import Aregister from './component/Adminpanel/Aregister';
// import { Cart } from '../../Backend/models/carts.model';
import Address from './component/User/Address';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    return (
        
        <Router>
        <Nav />
        <ToastContainer/>
            <Routes>
                <Route path="/" element={<ShowProduct />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/product/search/:term" element={<SearchProduct />} />
                <Route path="/register" element={<Register/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<CheckOut />} />
                <Route path="/address" element={<Address />} />
                {/* <Route path="/admin" element={<Aregister />} /> */}

            </Routes>
        </Router>
    );
};

export default App;
