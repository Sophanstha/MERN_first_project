import { Router } from "express";
import { getAllUser, getUserProfile, login, register } from "../controllers/user.controller.js";
import Authentication from "../middlewares/auth.middleware.js";
const router = Router()
router.route("/").post()
// router.get("/register",register)
router.route("/register").post(register)
router.route("/login").post(login)
router.route("/getUser").post(getAllUser)
router.route("/getUserProfile").get(Authentication,getUserProfile)



export default router

