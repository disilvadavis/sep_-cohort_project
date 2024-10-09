import express from 'express';
import { addRestaurant, getRestaurants, getRestaurantById } from '../controllers/restaurantController.js';
import { protect, authorize } from '../middleware/auth.js'
const router = express.Router();

// Add new restaurant
router.post('/', protect, authorize(true), addRestaurant);

// Get all restaurants
router.get('/', getRestaurants);

// Get restaurant by ID
router.get('/:restaurantId', getRestaurantById);

export default router;
