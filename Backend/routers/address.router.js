import { Router } from "express";
import { AddAddress, getAddress } from "../controllers/address.controller.js";
import Authentication from "../middlewares/auth.middleware.js";
const addRouter = Router()
addRouter.route("/addAddress").post(Authentication,AddAddress)
addRouter.route("/getAddress").get(Authentication,getAddress)
export {addRouter}