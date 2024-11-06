// console.log("hello mern ");
// import Connected from "../../FirstBjs/src/db/index.js";
import Connected from "./DB/index.js";
import dotenv from "dotenv"
import express from "express";
// import app from "./app.js";
import app from "./app.js";
// import bodyParser from "express"
dotenv.config({
    path: './.env'
});

const port = process.env.PORT || 3000
Connected()
    .then(() => {
        app.listen(port, () => {
            console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    })

    // import router from "./routers/user.routes.js";
    // const app = express() 
    // app.use(bodyParser.json())
    // app.use("/api/v1/user",router)