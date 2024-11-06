import mongoose from "mongoose";
const AddressSchema = new mongoose.Schema({
    userid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    fullname : {
        type : String,
        required : true
    },
    country : {
        type : String,
        required : true
    },
    city:{
        type : String,
        required : true
    },
    address :{
        type : String,
        required : true
    },
    pincode :{
        type : String,
        required : true
    },
    state:{
        type : String,
        required : true
    },
    phone :{
        type : Number,
        required : true
    }
},
{
    timestamps : true
})
export const Address = mongoose.model("Address",AddressSchema)