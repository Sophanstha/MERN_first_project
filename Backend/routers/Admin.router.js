import { Router } from "express";
import { getAllUser, login, register } from "../controllers/Admin.controller.js";
const Arouter = Router()
Arouter.route("/register").post(register)
Arouter.route("/login").post(login)
Arouter.route("/getalluser").get(getAllUser)

export default Arouter;
