// AppState.jsx
import React, { useEffect, useState } from 'react'
import AppContext from './AppContext'
import axios from 'axios';
import { ToastContainer, toast,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AppState = (props) => {
const [product,setproduct] = useState([])
const url = "http://localhost:1000/api/v1/"; 
const [token,settoken] = useState();
const [isAuth,setIsAuth] = useState(false);
//    const [filter,setFliter] = useState([])
const [user,setUser] = useState()
const [cart,setcart] = useState([])
const [reload,setreload] = useState(false)
const [userAddress,setuserAddress]= useState()
const [loginUser,setLoginUser] = useState()
useEffect(()=>{
    const fecthProduct = async ()=>{
        try{
            const api = await axios.get(`${url}product/getProduct`,{
                headers:{
                    "Content-Type" : "Application/json"
                },
                withCredentials : true,
            })
            console.log(api.data.product);
            setproduct(api.data.product);
            // setFliter[api.data.product]
            // console.log(filter);
            // getProfile()
            // userCart()
            // getUserAddress()
            // updateAddress()
            userInfo()

        }
        catch(error){
            console.log(error);
        }
    }
    fecthProduct();
},[token,reload])

useEffect(()=>{
const lsToken = localStorage.getItem("token");
console.log("lstoke",lsToken);

if(lsToken){
    settoken(lsToken);
    setIsAuth(true)
}

},[])
// const url = "http://localhost:1000/api/v1/";
console.log(url);

const register = async (username, email, password) => {
    try {
        const api = await axios.post(
            `${url}admin/register`,
            { username, email, password },
            {
                headers: {
                    "Content-Type": "application/json" // Lowercase
                },
                withCredentials: true,
            }
        );

        console.log(api.data.message);
        toast.success(api.data.message, {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
        return api.data;
    } catch (error) {
        console.log(error);
        toast.error(
            error.response?.status === 500
                ? "Server error occurred."
                : "Username or email has already been taken",
            {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            }
        );
    }
};


const login=async (email,password)=>{
    try{
        const api = await axios.post(`${url}admin/login`,{email,password},{
            headers:{
                "Content-Type" : "Application/json"
            },
            withCredentials : true,
        })
            console.log(api.data.message)
        toast.success(api.data.message, {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
            console.log(api.data.token);
            settoken(api.data.token)
            setIsAuth(true)
            localStorage.setItem("token",api.data.token)
         
            
        return api.data
       
    }
    catch(error){
        console.log(error);
        toast.error("email or passsword  doenot match", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        console.log(error);
    }    
}
const logout= ()=>{
    setIsAuth(false);
    localStorage.removeItem("token");
    settoken("")
    toast.success("logout succefully", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
}

// // profile
// const getProfile = async () => {
//     try {
//         const api = await axios.get(`${url}user/getUserProfile`, {
//             headers: {
//                 "Content-Type": "application/json",
//                 "dog" : token
//             },
//             withCredentials: true,
//         });
//         console.log(api.data);
//         setUser(api.data.user);
//         // console.log("user", user);
//     } catch (error) {
//         console.log(error);
//     }
// };

// //add tocart
// const addtocart = async (productid, title, price, qty, imgSrc) => {
//     try {
//         const api = await axios.post(`${url}cart/addCart`,{productid, title, price, qty, imgSrc}, {
//             headers: {
//                 "Content-Type": "application/json",
//                 dog : token
//             },
//             withCredentials: true,
//         });
//         console.log(api);
//         toast.success("added to cart", {
//             position: "top-left",
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "light",
//             transition: Bounce,
//             });
//         // console.log("user", user);
//         setreload(!reload)
//     } catch (error) {
//         console.log(error);
//     }
// };

// // profile
// const userCart = async () => {
//     try {
//         const api = await axios.get(`${url}cart/getallcart`, {
//             headers: {
//                 "Content-Type": "application/json",
//                 "dog" : token
//             },
//             withCredentials: true,
//         });
//         // console.log("userCart ",api);
//         setcart(api.data.cart)
//         // setUser(api.data.user);
//         // console.log("user", user);
//     } catch (error) {
//         console.log(error);
//     }
// };

// // devrease qty
// const decreaseqty = async (productid ,qty) => {
//     try {
//         const api = await axios.post(`${url}cart/--qty`,{productid ,qty}, {
//             headers: {
//                 "Content-Type": "application/json",
//                 "dog" : token
//             },
//             withCredentials: true,
//         });
//         toast.success("product quantity has been decrease", {
//             position: "top-left",
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "light",
//             transition: Bounce,
//             });
//        setreload(!reload)
//     } catch (error) {
//         console.log(error);
//     }
// };

// // remove cart 
// const removecart = async (productid) => {
//     try {
//         const api = await axios.delete(`${url}cart/remove/${productid}`, {
//             headers: {
//                 "Content-Type": "application/json",
//                 "dog" : token
//             },
//             withCredentials: true,
//         });
//         toast.success("item has been remove", {
//             position: "top-left",
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "light",
//             transition: Bounce,
//             });
//        setreload(!reload)
//     } catch (error) {
//         console.log(error);
//     }
// }
// addAddress
// import axios from 'axios';
// import { toast, Bounce } from 'react-toastify';


const updateAddress = async (
  fullname,
  city,
  address,
  phone,
  pincode,
  state,
  country,
) => {
  try {
    const api = await axios.post(
      `${url}address/addAddress`, // Adjust endpoint to match functionality
      {
        fullname,
        city,
        address,
        phone,
        pincode,
        state,
        country
      },
      {
        headers: {
          "Content-Type": "application/json",
          dog:  token, // Assuming token is needed here
        },
        withCredentials: true,
      }
    );

    toast.success("Address has been updated", {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    return api.data

    // setRload(!reload); // Toggle reload state
  } catch (error) {
    console.error("Error updating address:", error);
    // toast.error("Failed to update address");
  }
};

// export default updateAddress;

// get user address 
const getUserAddress = async () => {
    try {
        const api = await axios.get(`${url}address/getAddress`, {
            headers: {
                "Content-Type": "application/json",
                "dog" : token
            },
            withCredentials: true,
        });
        console.log("user data : ",api.data.userAddress
        );
        setuserAddress(api.data.userAddress)

            // return api.data
            
    //    setreload(!reload)
    } catch (error) {
        console.log(error);
    }
}



const AminRegister=async (username,email,password)=>{
    try{
        const api = await axios.post(`${url}admin/register`,{username,email,password},{
            headers:{
                "Content-Type" : "Application/json"
            },
            withCredentials : true,
        })
            console.log(api.data.message)
        toast.success(api.data.message, {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
        return api.data
       
    }
    catch(error){
        console.log(error);
        toast.error("user name or email has already taken", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        console.log(error);
    }    
}


const deletepdt = async (productid) => {
    try {
        const api = await axios.delete(`${url}product/${productid}`, {
            headers: {
                "Content-Type": "application/json",
                // "dog" : token
            },
            withCredentials: true,
        });
        toast.success("item has been remove", {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
       setreload(!reload)
    } catch (error) {
        console.log(error);
    }
}

const addproduct = async (formData) => {
    try {
        // Make the POST request
        const api = await axios.post(
            `${url}product/add`,
            formData, // Send the FormData object
            
            {
                headers: {
                    "Content-Type": "multipart/form-data" // Use multipart/form-data when sending files
                },
                withCredentials: true,
            }
        );

        console.log(api.data.message);
        toast.success(api.data.message, {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
        setreload(!reload)
        return api.data;
    } catch (error) {
        console.log(error);
        toast.error(
            error.response?.status === 500
                ? "Server error occurred."
                : "there is so,ething wrong", // Adjust this error message based on your context
            {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            }
        );
        return null; // Make sure to return null or handle error as needed
    }
};
// loginuser
const userInfo = async () => {
    try {
        const api = await axios.post(`${url}user/getUser`, {
            headers: {
                "Content-Type": "application/json",
                // "dog" : token
            },
            withCredentials: true,
        });
        console.log("user login : ",api.data.user);
        // setuserAddress(api.data.userAddress)
        setLoginUser(api.data.user)
    } catch (error) {
        console.log(error);
    }
}


const updateproduct = async (formData,id) => {
    try {
        // Make the POST request
        const api = await axios.put(
            `${url}product/${id}`,
            formData, // Send the FormData object
            
            {
                headers: {
                    "Content-Type": "multipart/form-data" // Use multipart/form-data when sending files
                },
                withCredentials: true,
            }
        );

        console.log(api.data);
        toast.success(api.data.message, {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
        setreload(!reload)
        return api.data;
    } catch (error) {
        console.log(error);
        toast.error(
            error.response?.status === 500
                ? "Server error occurred."
                : "there is so,ething wrong", // Adjust this error message based on your context
            {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            }
        );
        return null; // Make sure to return null or handle error as needed
    }
};

return (
        <AppContext.Provider value={{updateproduct,loginUser,deletepdt,addproduct,AminRegister,userAddress, cart,getUserAddress,setcart,product,register,login,token,url,isAuth,setIsAuth,logout,user,updateAddress }}>  {/* Wrapped data in an object */}
            {props.children}
        </AppContext.Provider>
    )
}

export default AppState
