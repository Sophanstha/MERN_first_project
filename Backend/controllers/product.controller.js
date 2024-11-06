import { Product } from "../models/product.model.js"
import { uploadFileToCloudinary } from "../cloudinary.js";
const addProduct = async (req, res) => {
    try {
        const { title, description, price, qty, category } = req.body;
        const avatarlocalpath = req.files?.imgSrc?.[0]?.path;

        console.log("Request files:", req.files);

        if (!avatarlocalpath) {
            throw new ApiError(400, "Avatar image is required");
        }

        // Upload the image to Cloudinary
        const imgSrc = await uploadFileToCloudinary(avatarlocalpath);

        if (!imgSrc) {
            throw new ApiError(400, "Failed to upload avatar image");
        }

        const product = await Product.create({
            title, description, price, qty, category, imgSrc
        });

        return res.status(200).json({
            message: "Product added successfully",
            product,
            success: true
        });
    } catch (error) {
        console.error("Error adding product:", error.message);
        return res.status(400).json({
            message: "There was an error adding the product",
            error: error.message
        });
    }
};
// get all product
const getProduct = async(req,res)=>{
    try {
        const product = await Product.find().sort({createdAt : -1})
        res.status(200).json({product,message : "all Product",success : true})
    } catch (error) {
        console.log("there  is some error in getAll product",error.message);
        return res.status(400).json({message : error.message})
    }
}

// get product by id
const getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id)
        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }
        res.status(200).json({ product, message: "Product found", success: true })
    }
    catch(erroor){
        console.log("there is some error in get product by id",erroor.message);
        return res.status(400).json({message : erroor.message})
    }
}

// update by id
// const updateProductById = async (req, res) => {
//     try {
//         const id = req.params.id;
//         let product = await Product.findByIdAndUpdate(id,req.body,{new : true})
//         if (!product) {
//             return res.status(404).json({ message: "Product not found" })
//         }
//         res.status(200).json({ product, message: "Product updated successfully", success: true})

//     }
//     catch(error){
//         console.log("there is some error in update product by id",error.message);
//         return res.status(400).json({message : erroor.message})


//     }
// }
const updateProductById = async (req, res) => {
    try {
        const id = req.params.id;

        // Find the product
        let product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Update product fields
        product.title = req.body.title || product.title;
        product.description = req.body.description || product.description;
        product.price = req.body.price || product.price;
        product.qty = req.body.qty || product.qty;
        product.category = req.body.category || product.category;

        // If there's a file, update the imgSrc field with the new file path
        if (req.file) {
            product.imgSrc = `/public/temp/${req.file.filename}`; // Adjust path as needed
        }

        // Save the updated product
        await product.save();

        res.status(200).json({ product, message: "Product updated successfully", success: true });
    } catch (error) {
        console.log("There is an error in updateProductById:", error.message);
        return res.status(400).json({ message: error.message });
    }
};
// delete product by id
const deleteProductById = async (req, res) => {
    try {
        const id = req.params.id;
        let product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(400).json({message :"prdouct doesnot exit"});
        }
        return res.status(200).json({
            message: "Product deleted successfully",
            product
        })
    } catch (error) {
        console.log("there is some error in delete product by id",error.message);
        return res.status(400).json({message : error.message})
        
    }

}
export {addProduct,getProduct,getProductById,updateProductById,deleteProductById}