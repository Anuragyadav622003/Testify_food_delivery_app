const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  deliveryName:String,
  orderNumber: { type: String, required: true, unique: true }, // Manually set and unique
  items: [{
    product: {
      type: {
        _id: String,
        id: Number,
        category: String,
        name: String,
        description: String,
        price: Number,
        image: String,
        quantity: Number
      }
    }
  }],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['Order Placed', 'Order Confirmed', 'Order Processed', 'Ready to Pickup','Delivered'], default: 'Order Placed' },
  deliveryAddress: { type: String, required: true },
  deliveryPhoneNumber: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
