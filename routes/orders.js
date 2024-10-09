import express from 'express';
import { placeOrder, getUserOrders, getOrderById, updateOrderStatus, deleteOrder } from '../controllers/orderController.js';

const router = express.Router();

// Place an order
router.post('/', placeOrder);

// Get all orders of a user
router.get('/users/:userId/orders', getUserOrders);

// Get order by ID
router.get('/:orderId', getOrderById);

// Update order status
router.put('/:orderId', updateOrderStatus);

// Delete an order
router.delete('/:orderId', deleteOrder);

export default router;
