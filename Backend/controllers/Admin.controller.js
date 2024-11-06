// import { User } from "../models/user.model.js"
// import User from "../models/user.model.js";
import { Admin } from "../models/Admin.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        let user =await Admin.findOne({email});
        if(user){
            return res.status(400).json({message: "user already exists",success : false});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
         user = await Admin.create({
            username,
            email,
            password : hashedPassword
        });
        res.status(201).json({ user, message: "User registered successfully", success: true });
    } catch (error) {
        console.log("There was an error in the register method of user:", error); // Log the actual error
        res.status(500).json({ message: "Server error. Unable to register user.", success: false }); // Send a proper response
    }
};

const login = async (req,res)=>{
    const {email,password}=req.body;
try {
        let user = await Admin.findOne( {email} )
        if(!user){
            return res.status(400).json({message:"Invalid email ",success:false})
        }
        const isvalidPassword = await bcrypt.compare(password,user.password);
        if(!isvalidPassword){
            return res.status(400).json({message:"Invalid password",success:false})
        }
        const token = jwt.sign({
            userId: user._id,},"7894",{expiresIn: "90d"})
        return res.status(200).json({message : `welcome ${user.username}`,success : true,token})
} catch (error) {
    console.log("there is some error in login",error.message);
    return res.status(400).json({message : "there is some error in login"})
}
}

const getAllUser = async(req,res)=>{
    try {
        const user = await Admin.find().sort({createdAt : -1})
        res.status(200).json({user,message : "all user",success : true})
    } catch (error) {
        console.log("there  is some error in getAllUser",error.message);
        return res.status(400).json({message : error.message})
        
    }
}

// get user profile 

export  { register ,login,getAllUser};
