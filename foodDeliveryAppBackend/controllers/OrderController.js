// controllers/orderController.js
const Order = require('../modals/Order');
const cron = require('node-cron');
const User = require('../modals/user');

// controllers/orderController.js

// Initialize and schedule cron job to update order statuses every 10 minutes
cron.schedule('*/5 * * * *', async () => {
  console.log('Running a job every 5 minutes to update order statuses');
  try {
    // Get the current time
    const now = new Date();

    // Find orders that need status updates
    const orders = await Order.find({
      status: { $in: ['Order Placed', 'Order Confirmed', 'Order Processed', 'Ready to Pickup'] }
    });

    const bulkOps = orders.map((order) => {
      const orderAgeMinutes = (now - new Date(order.createdAt)) / (1000 * 60); // Calculate the age of the order in minutes
      let newStatus = order.status;
      console.log(orderAgeMinutes,"hhh")

      if (orderAgeMinutes >= 30 && order.status !== 'Delivered') {
        newStatus = 'Delivered';
      } else if (orderAgeMinutes >= 20 && order.status === 'Order Processed') {
        newStatus = 'Ready to Pickup';
      } else if (orderAgeMinutes >= 10 && order.status === 'Order Confirmed') {
        newStatus = 'Order Processed';
      } else if (orderAgeMinutes >= 5 && order.status === 'Order Placed') {
        newStatus = 'Order Confirmed';
      }

      if (newStatus !== order.status) {
        return {
          updateOne: {
            filter: { _id: order._id },
            update: { status: newStatus },
          },
        };
      }
    }).filter(Boolean);

    if (bulkOps.length > 0) {
      const bulkWriteResult = await Order.bulkWrite(bulkOps);
      console.log('Bulk update result:', bulkWriteResult);
    } else {
      console.log('No orders required updates');
    }
  } catch (error) {
    console.error('Error updating order statuses:', error);
  }
});




// Controller function to place a new order
const placeOrder = async (req, res) => {
  try {
    const { deliveryName, deliveryAddress, deliveryPhoneNumber, product } = req.body;

    // Calculate total amount based on product price and quantity
    const totalAmount = product.price * product.quantity;
    const orderNumber = `ORD${Date.now()}`;

    // Create a new order instance
    const newOrder = new Order({
      userId: req.user.userId,
      deliveryName,
      deliveryAddress,
      deliveryPhoneNumber,
      items: [{ product }],
      totalAmount,
      orderNumber,
    });

    // Save the order to the database
    await newOrder.save();

    res.status(201).json({ message: 'Order placed successfully!', order: newOrder });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Failed to place order. Please try again later.' });
  }
};

// Controller function to fetch orders by user ID
const getOrdersByUser = async (req, res) => {
  const userId = req.user.userId;

  try {
    const orders = await Order.find({ userId }).exec();
    const auth  = await User.find({_id:userId});
    console.log(auth)
    res.status(200).json({orders,auth});
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders. Please try again later.' });
  }
};

// Controller function to update order status by order ID
const updateOrderStatus = async (req, res) => {
  const orderId = req.params.orderId;
  const { status } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    ).exec();

    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Failed to update order status. Please try again later.' });
  }
};

module.exports = {
  placeOrder,
  getOrdersByUser,
  updateOrderStatus,
};
