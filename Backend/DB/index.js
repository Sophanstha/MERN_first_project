import mongoose from "mongoose";
const Connected = async ()=>{
    try {
     let connectionInstance = await mongoose.connect(`${process.env.MANGODB_URI}/${process.env.Db_name }`)
     console.log("Db connect at : ",connectionInstance.connection.host);     
    } catch (error) {
        console.log("error in db coonnection ", error);
        
    }
}
export default Connected