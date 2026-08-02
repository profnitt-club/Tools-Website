const express = require('express');
const authMiddleware = require('../middleware/auth');
const contactsController = require('../controllers/contacts.controller');

const router = express.Router();

/**
 * POST /api/contacts
 * Public — submit a contact form.
 */
router.post('/', contactsController.createContact);

/**
 * GET /api/contacts
 * Admin — list all contact submissions.
 */
router.get('/', authMiddleware, contactsController.getContacts);

/**
 * PATCH /api/contacts/:id/read
 * Admin — mark a contact as read.
 */
router.patch('/:id/read', authMiddleware, contactsController.markRead);

/**
 * DELETE /api/contacts/:id
 * Admin — delete a contact submission.
 */
router.delete('/:id', authMiddleware, contactsController.deleteContact);

module.exports = router;
