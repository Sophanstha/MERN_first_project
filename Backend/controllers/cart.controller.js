import { Cart } from "../models/carts.model.js";

// add to cart 
const addToCart = async (req, res) => {
  try {
    const { productid, title, price, qty, imgSrc } = req.body;
    const userid = req.user;
    console.log(userid);
    
    
    let cart = await Cart.findOne({ userid }); 
    
    // If cart doesn't exist, create a new one
    if (!cart) {
      cart = new Cart({ userid, items: [] });
    }

    // Check if the item already exists in the cart
    const itemIndex = cart.items.findIndex(
      (item) => item.productid.toString() === productid.toString()
    );

    if (itemIndex > -1) {
      // Update quantity and price if item exists
      cart.items[itemIndex].qty += parseInt(qty);
      cart.items[itemIndex].price += parseFloat(price) * parseInt(qty);
    } else {
      // Add new item to cart
      cart.items.push({
        productid,
        title,
        price: parseFloat(price),  // Ensure price is a number
        qty: parseInt(qty),        // Ensure qty is a number
        imgSrc
      });
    }

    // Save the updated cart
    await cart.save();

    res.status(200).json({
      message: "Product added to cart",
      cart,
      success: true
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
// get User Cart
const getUserCart = async(req,res)=>{
    try {
    const userid = req.user;
    
      console.log(userid);
      
        let cart = await Cart.findOne({ userid })
        if (!cart) {
            return res.status(200).json({message : "cart doenot found"})
        }
        res.status(200).json({message : "cart found",cart})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
        
    }
}
// delete item from cart
const removeProductFromCart = async (req, res) => {
    try {
      const productid = req.params.productId;
      // const userid = "671a56342cee52e8b85d0125";
      const userid = req.user;

  
      // Find the user's cart by userid
      let cart = await Cart.findOne({ userid });
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
  
      // Filter out the product with the given productid
      cart.items = cart.items.filter((item) => item.productid.toString() !== productid);
  
      // Save the updated cart
      await cart.save();
  
      res.status(200).json({ message: "Product removed from cart", cart });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  };
  // clear cart
  const clearCart = async (req, res) => {
    try {
      // const userid = "671a56342cee52e8b85d0125";
      const userid = req.user;
      // Find the user's cart by userid
      let cart = await Cart.findOne({ userid });
      if(!cart){
        cart = new Cart({ items:[] })
      }
      else{
        cart.items =[]
      }
      await cart.save()
      res.status(200).json({message : "cart cleared succefully"})

    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
            
    }
  }
  
  // decrease qty
  const decreaseQuantity = async (req, res) => {
    try {
      const { productid, qty } = req.body;
      // const userid = "671a56342cee52e8b85d0125";
      const userid = req.user;

      
      let cart = await Cart.findOne({ userid }); 
      
      // If cart doesn't exist, create a new one
      if (!cart) {
        cart = new Cart({ userid, items: [] });
      }
  
      // Check if the item already exists in the cart
      const itemIndex = cart.items.findIndex(
        (item) => item.productid.toString() === productid.toString()
      );
  
      if (itemIndex > -1) {
        const item = cart.items[itemIndex] ;
       
        if(item.qty > qty){
          let priceoerunit = item.price / item.qty

          item.qty -= qty
          item.price -= priceoerunit * item.qty
       
        }
        else{
          cart.items.splice(itemIndex, 1);
        }

      } else {
    return res.status(200).json({message : "invalid product id"})        
      }
  
      // Save the updated cart
      await cart.save();
      res.status(200).json({
        message: "Product qty has been decrease",
        cart,
        success: true
      });      
    }
    catch(error){
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }

export { addToCart ,getUserCart,removeProductFromCart,clearCart,decreaseQuantity };
