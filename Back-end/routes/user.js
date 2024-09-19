const express = require('express');
const { getAllUsers } = require('../controllers/userController');
const { auth, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

// Route to get all users (Admin only)
router.get('/all', auth, isAdmin, getAllUsers);

module.exports = router;
