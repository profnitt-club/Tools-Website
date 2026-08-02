const express = require('express');
const authMiddleware = require('../middleware/auth');
const authController = require('../controllers/auth.controller');

const router = express.Router();

/**
 * POST /api/auth/login
 * Admin login — returns JWT token.
 */
router.post('/login', authController.login);

/**
 * GET /api/auth/me
 * Get current admin info (protected).
 */
router.get('/me', authMiddleware, authController.getMe);

module.exports = router;
