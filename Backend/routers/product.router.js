import { addProduct, deleteProductById, getProduct, getProductById, updateProductById } from "../controllers/product.controller.js";
import { Router } from "express";
import { upload } from "../middlewares/multer.js";
const prouter = Router()
 
prouter.route("/add").post(
    upload.fields([
        { name: "imgSrc", maxCount: 1 },
        // { name: "cover", maxCount: 1 }
    ]),
    (req, res, next) => {
        console.log(req.files); // Log the files received
        console.log(req.body);  // Log other form fields
        next();
    },
    addProduct)
prouter.route("/getProduct").get(getProduct)
prouter.route("/:id").get(getProductById)
prouter.route("/:id").put(
    upload.fields([
        { name: "imgSrc", maxCount: 1 },
        // { name: "cover", maxCount: 1 }
    ]),
    (req, res, next) => {
        console.log(req.files); // Log the files received
        console.log(req.body);  // Log other form fields
        next();
    }
    ,updateProductById)
prouter.route("/:id").delete(deleteProductById)
export default prouter;