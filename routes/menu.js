import express from 'express';
import { addMenuItem, getMenuItems, updateMenuItem, deleteMenuItem } from '../controllers/menuController.js';

const router = express.Router();

// Add new menu item to restaurant
router.post('/:restaurantId/menu', addMenuItem);

// Get all menu items of a restaurant
router.get('/:restaurantId/menu', getMenuItems);

// Update menu item
router.put('/:restaurantId/menu/:itemId', updateMenuItem);

// Delete menu item
router.delete('/:restaurantId/menu/:itemId', deleteMenuItem);

export default router;
