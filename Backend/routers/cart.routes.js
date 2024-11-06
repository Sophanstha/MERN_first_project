import { Router } from "express";
import { addToCart, clearCart, decreaseQuantity, getUserCart, removeProductFromCart } from "../controllers/cart.controller.js";
import Authentication from "../middlewares/auth.middleware.js";
const cartRoute = Router()
cartRoute.route("/addCart").post(Authentication,addToCart)
cartRoute.route("/getallcart").get(Authentication,getUserCart)
// cartRoute.route("/remove/productId").delete(removeProductFromCart)
cartRoute.route("/remove/:productId").delete(Authentication,removeProductFromCart);
cartRoute.route("/clear").delete(Authentication,clearCart)
cartRoute.route("/--qty").post(Authentication,decreaseQuantity)
export { cartRoute}