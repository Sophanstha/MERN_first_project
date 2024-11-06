import express from "express"
import cors from "cors"
const app = express();
app.use(cors({
    origin : true,
    credentials :true,
    methods : ["GET", "POST", "PUT", "DELETE"],

}))

app.use(express.json({
    limit:"16kb"
}))

app.use(express.urlencoded({
    extended: true,
    limit:"18kb"
}))

app.use(express.static("public"))

// app.use(cookieParser())

import router from "./routers/user.routes.js";
import prouter from "./routers/product.router.js";
import { cartRoute } from "./routers/cart.routes.js";
import { addRouter } from "./routers/address.router.js";
import Arouter from "./routers/Admin.router.js";
// user route
app.use("/api/v1/user",router)
//  product route
app.use("/api/v1/product",prouter)
// cart route
app.use("/api/v1/cart",cartRoute)
app.use("/api/v1/address",addRouter)
app.use("/api/v1/admin",Arouter)

export default app ;