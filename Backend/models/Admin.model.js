import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
  
},
{
    timestamps : true
})

// userSchema.methods.generateRefreshToken = function(){
//     return jwt.sign(
//         {
//             _id: this._id,
            
//         },
//         "12345",
//         {
//             expiresIn: "365d"
//         }
//     )
//   }

export const Admin = mongoose.model("Admin",AdminSchema)