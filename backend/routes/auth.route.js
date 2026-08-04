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

/**
 * POST /api/auth/forgot-password
 * Request a password reset link via Resend email.
 */
router.post('/forgot-password', authController.forgotPassword);

/**
 * GET /api/auth/verify-reset-token/:token
 * Verify if password reset token is valid.
 */
router.get('/verify-reset-token/:token', authController.verifyResetToken);

/**
 * POST /api/auth/reset-password
 * Reset password using valid token.
 */
router.post('/reset-password', authController.resetPassword);

module.exports = router;
