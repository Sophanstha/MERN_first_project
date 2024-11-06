import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const Authentication = async (req, res, next) => {
  try {
    // Extract token from "Auth" or "Authorization" header
    // const token = req.header("dog") 
    const token = req.header("dog")?.replace("Bearer ", "");
    // console.log("Header received:", req.headers);
    
    // console.log("Token received:", token);
    if (!token){ return res.status(401).json({ message: "Login first" });
  }
    // Verify JWT and extract user ID
    const decoded = jwt.verify(token, "7894"); // Ensure the secret matches
    // console.log(decoded);
    
    const id = decoded.userId;

    // Find user in the database
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error.message); // Log specific error
    res.status(401).json({ message: "Authentication failed" });
  }
};

export default Authentication;
