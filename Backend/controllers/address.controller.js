import { Address } from "../models/Adress.model.js";
const AddAddress = async(req,res)=>{
    try {
        let {
            fullname,
            city,
            address,
            phone,
            pincode,
            state,
            country
        } = req.body
    const userid = req.user;
        
        const userAddress = await Address.create({
            userid,
            fullname,
            city,
            address,
            phone,
            pincode,
            state,
            country
        })
        res.status(200).json({message : "Address has been succesfull enter" ,userAddress,success : true})
    } catch (error) {
        console.log(error.message);
    res.status(400).json({ message: error.message });
    }
}

// getAddress

const getAddress = async (req, res) => {
    try {
        let address = await Address.find({ userid: req.user }).sort({ createdAt: -1 });
        console.log("address : : :", address);

        if (address.length === 0) {
            return res.status(404).json({ message: "No address found for this user." });
        }

        res.status(200).json({ message: "Address is:", userAddress: address[0] });
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: error.message });
    }
};
export {AddAddress,getAddress}