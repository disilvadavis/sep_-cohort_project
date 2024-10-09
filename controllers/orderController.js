import Order from '../models/Order.js';
import Menu from '../models/Menu.js';

// @desc Create a new order
// @route POST /orders
// @access Private
export const createOrder = async (req, res) => {
  const { restaurantId, items, totalPrice } = req.body;

  try {
    const order = new Order({
      user: req.user._id,
      restaurant: restaurantId,
      items,
      totalPrice,
      status: 'Pending',
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order' });
  }
};

// @desc Get all orders for a user
// @route GET /orders
// @access Private
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('restaurant items.menuItem');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

// @desc Update order status
// @route PUT /orders/:orderId
// @access Private (Admin/Owner)
export const updateOrderStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const order = await Order.findById(req.params.orderId);

    if (order) {
      order.status = status || order.status;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update order status' });
  }
};

// @desc Delete order
// @route DELETE /orders/:orderId
// @access Private (Admin/Owner)
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);

    if (order) {
      await order.remove();
      res.json({ message: 'Order removed' });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete order' });
  }
};
