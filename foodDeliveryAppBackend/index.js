// Import required modules
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const VarifyToken = require('./midleware.js/VarifyToken');
const { storeRestaurant, getRestaurants } = require('./controllers/Restaurant');
const { seedFoodProducts, getFoodProducts } = require('./controllers/FoodProductController');
const { getCategories, createCategory } = require('./controllers/CategoryController');
const { addItemToCart, removeItemFromCart, getCartByUserId, clearCart } = require('./controllers/CartController');
const {Login,register} =  require("./controllers/AuthController");
const { placeOrder, updateOrderStatus, getOrdersByUser } = require('./controllers/OrderController');




// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => { 
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB', err);
});

// Define routes
app.get('/', (req, res) => {
  res.send('Hello World');
});


app.use('/login',Login);
app.use('/register',register);

app.use('/store_restaurants',storeRestaurant);
app.use("/get_restaurants",getRestaurants);

app.use('/getCategory',getCategories);
app.use('/createCategory',createCategory);
app.use('/foodProducts',seedFoodProducts)
app.use('/getFoodProduct',getFoodProducts);


app.use('/addToCart',VarifyToken,addItemToCart);
app.use('/removeCartItem',VarifyToken,removeItemFromCart);
app.use('/getUserCart',VarifyToken,getCartByUserId);
app.use("/removeUserCart",VarifyToken,clearCart);

app.use("/placeOrder",VarifyToken,placeOrder);
app.use("/updateOderStatus",VarifyToken,updateOrderStatus);
app.use('/getOrdersByUser',VarifyToken,getOrdersByUser);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
