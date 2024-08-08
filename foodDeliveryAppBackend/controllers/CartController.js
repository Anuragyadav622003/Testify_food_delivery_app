const Cart = require("../modals/Cart");
const foodProduct = require('../modals/FoodProduct')

// Get Cart by User ID
const getCartByUserId = async (req, res) => {
  try {
 
    const cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const allFood = await foodProduct.find();

    const UserCart = cart.items.map(item => {
      const product = allFood.find(product => product._id.toString() === item.productId.toString());
      return {
        ...item._doc,
        productDetails: product,
      };
    });
   console.log(UserCart)
    res.status(200).json(UserCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Add Item to Cart
const addItemToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.userId;

  try {
    let cart = await Cart.findOne({ userId });
      if (cart) {
      // Cart exists, update it
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
      if (itemIndex > -1) {
        // Product exists in the cart, update the quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Product does not exist in the cart, add new item
        cart.items.push({ productId, quantity });
      }
    } else {
      // No cart for the user, create new cart
      cart = new Cart({
        userId,
        items: [{ productId, quantity }]
      });
    }

    cart.updatedAt = Date.now();
    await cart.save();
   
    res.status(201).json(cart);
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: error.message });
  }
};

// Remove Item from Cart
const removeItemFromCart = async (req, res) => {
const {id} = req.body;

const userId = req.user.userId;
  try {
    const cart = await Cart.findOne({ userId: req.user.userId });

    if (cart) {
      cart.items = cart.items.filter(item => item._id.toString() !== id);
      console.log(cart,id)
      cart.updatedAt = Date.now();
      await cart.save();
      return res.status(200).json(cart);
    }

    res.status(404).json({ message: 'Cart not found' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Clear Cart
const clearCart = async (req, res) => {

  try {
    const cart = await Cart.findOne({ userId: req.user.userId });

    if (cart) {
      cart.items = [];
      cart.updatedAt = Date.now();
      await cart.save();
      return res.status(200).json(cart);
    }

    res.status(404).json({ message: 'Cart not found' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};




module.exports = {
  getCartByUserId,
  addItemToCart,
  removeItemFromCart,
  clearCart
};
