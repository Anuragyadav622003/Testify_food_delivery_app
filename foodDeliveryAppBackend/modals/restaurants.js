const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Menu Item Schema
const menuItemSchema = new Schema({
    id: Number,
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    image: String,
}, { _id: false }); // Disables the creation of an _id field for subdocuments

// Address Schema
const addressSchema = new Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true },
}, { _id: false });

// Restaurant Schema
const restaurantSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    image: String,
    cuisine: { type: String, required: true },
    rating: { type: Number, required: true },
    address: { type: addressSchema, required: true },
    openingHours: { type: String, required: true },
    contact: { type: String, required: true },
    description: String,
    menu: { type: [menuItemSchema], required: true },
}, { timestamps: true });

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = { Restaurant };
