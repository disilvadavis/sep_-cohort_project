import express from 'express';
import { signup, login,getUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Signup
router.post('/signup', signup);

// Login
router.post('/login', login);

// Get user profile
router.get('/:userId', getUserProfile);

export default router;
