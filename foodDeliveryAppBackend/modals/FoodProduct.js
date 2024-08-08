// models/FoodProduct.js
const mongoose = require('mongoose');

const foodProductSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  category: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true }
});

const FoodProduct = mongoose.model('FoodProduct', foodProductSchema);

module.exports = FoodProduct;
